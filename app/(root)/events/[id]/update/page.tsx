'use client';
import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { useUser } from "@clerk/clerk-react";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const user = useUser();
  const userId = user.user?.publicMetadata.userId as string;
  const event = await getEventById(id);

  return (
    <>
      <div className=" mt-24 mx-12 flex flex-col gap-1">
        <h2 className="wrapper h2-bold text-center sm:text-left">
          Update Event
        </h2>

        <div className="wrapper">
          <EventForm
            type="Update"
            event={event}
            eventId={event._id}
            userId={userId}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateEvent;
