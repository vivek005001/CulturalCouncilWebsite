import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { getClubNameByEmail } from "@/lib/actions/club.action";
import { createUser, updateUser, deleteUser } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, image_url } = evt.data;

    const isadmin =
      email_addresses[0].email_address ===
      "cultural_secretary@students.iitmandi.ac.in";

    const isClub =
      getClubNameByEmail(email_addresses[0].email_address) !== null;
    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      clubName: first_name,
      isAdmin: isadmin,
      photo: image_url,
      isClub,
    };

    const newUser = await createUser(user);

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: "User created", user: newUser });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, image_url } = evt.data;

    const user = {
      clubName: first_name,
      photo: image_url,
    };

    const updatedUser = await updateUser(id, user);

    if (updatedUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: updatedUser._id,
        },
      });
    }

    return NextResponse.json({ message: "User updated", user: updatedUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const deletedUser = await deleteUser(id!);
    return NextResponse.json({ message: "User updated", user: deletedUser });
  }

  return new Response("", { status: 200 });
}