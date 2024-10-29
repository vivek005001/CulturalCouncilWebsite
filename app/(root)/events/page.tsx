"use client";
import Timeline from "@/components/shared/Timeline";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { getClubNameByEmail } from "@/lib/actions/club.action";
const Page = () => {
  const user = useUser();
  const userId = user.user?.publicMetadata.userId as string;
  const isClub =
    getClubNameByEmail(
      user.user?.primaryEmailAddress?.emailAddress as string
    ) !== null;
  return (
    <div className="w-full mt-12">
      <div className="flex flex-col justify-center items-center mb-24">
        <div className="mt-32 sm:mt-48 text-xl font-medium text-neutral-100/[0.7] text-center">
          This is the Cultural Society, IIT Mandi
        </div>
        <h1 className="text-6xl max-w-screen-md font-semibold text-center leading-tight">
          Our Events
        </h1>
        <SignedIn>
          {isClub && (
            <Link href={"/events/create"}>
              <Button className="mt-5">Add New Event</Button>
            </Link>
          )}
        </SignedIn>
      </div>
      <Timeline userId={userId} />
    </div>
  );
};

export default Page;
