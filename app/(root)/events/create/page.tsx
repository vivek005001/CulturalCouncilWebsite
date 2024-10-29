"use client";
import EventForm from "@/components/shared/EventForm";
import { useUser } from "@clerk/clerk-react";

const CreateEvent = () => {
  const user = useUser();
  const userId = user.user?.publicMetadata.userId as string;

  return (
    <>
      <div className=" mt-24 mx-12 flex flex-col gap-1">
        <h2 className="wrapper h2-bold text-center sm:text-left">
          Create Event
        </h2>

        <div className="wrapper">
          <EventForm userId={userId} type="Create" />
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
