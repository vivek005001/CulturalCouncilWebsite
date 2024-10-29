"use client";
import React, { useEffect, useState } from "react";
import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { DeleteConfirmation } from "./DeleteConfirmation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserById } from "@/lib/actions/user.actions";

type CardProps = {
  event: IEvent;
  userId: string;
};

const clubs = [
  {
    name: "Drama",
    email: "dramaclub@students.iitmandi.ac.in",
    image: "/assets/logo/drama1.svg",
  },
  {
    name: "UDC",
    email: "danceclub@students.iitmandi.ac.in",
    image: "/assets/logo/udc1.svg",
  },
  {
    name: "Designauts",
    email: "designauts@students.iitmandi.ac.in",
    image: "/assets/logo/designauts1.svg",
  },
  {
    name: "PMC",
    email: "pmc@students.iitmandi.ac.in",
    image: "/assets/logo/pmc.svg",
  },
  {
    name: "Artgeeks",
    email: "artgeeks@students.iitmandi.ac.in",
    image: "/assets/logo/artgeeks.svg",
  },
  {
    name: "Music",
    email: "musicclub@students.iitmandi.ac.in",
    image: "/assets/logo/music1.svg",
  },
  {
    name: "SPICMACAY",
    email: "spicmacay@students.iitmandi.ac.in",
    image: "/assets/logo/spicmacay.svg",
  },
  {
    name: "Cultural Council",
    email: "cultural_secretary@students.iitmandi.ac.in",
    image: "/assets/images/CCLogo.png",
  },
];

const truncateDescription = (
  description: string | undefined,
  wordLimit: number
) => {
  if (!description) return "";
  const words = description.split(" ");
  if (words.length <= wordLimit) return description;
  return words.slice(0, wordLimit);
};

const EventComponent = ({ event, userId }: CardProps) => {
  const isEventCreator = userId
    ? userId === event.organizer?._id.toString()
    : false;
  const [openDialog, setOpenDialog] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [wordLimit, setWordLimit] = useState(22);
  const [logo, setLogo] = useState<string | null>(null);

  const [screen, setScreen] = useState(0);
  const updateWordLimit = () => {
    if (window.innerWidth < 460) {
      setWordLimit(0);
    } else if (window.innerWidth < 770) {
      setWordLimit(6);
    } else {
      setWordLimit(22);
    }
  };
  const checkAdmin = async () => {
    if (!userId) return;
    const user = await getUserById(userId);

    if (user?.isAdmin) {
      setIsAdmin(true);
    }
  };
  const updateClub = async () => {
    const organizer = await getUserById(event.organizer?._id);

    const clubImage =
      clubs.find((club) => club.email === organizer.email)?.image ?? null;

    setLogo(clubImage);
  };

  useEffect(() => {
    updateWordLimit();
    checkAdmin();
    updateClub();
    setScreen(window.innerWidth);
    window.addEventListener("resize", updateWordLimit);
    return () => window.removeEventListener("resize", updateWordLimit);
  }, []);
  return (
    <div className="flex flex-col ml-20 max-md:ml-4 max-sm:ml-0">
      <div className="flex gap-4 mb-2 mx-32 max-lg:mx-8 justify-center max-md:mr-5 items-center">
        <div className="flex-shrink-0 max-sm:hidden">
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-48 h-48 max-md:w-36 max-md:h-36 rounded-xl object-cover"
            />
          )}
        </div>
        <div className="bg-purple-950 bg-opacity-35 p-4 border-2 border-white rounded-xl flex-grow h-48 max-md:h-36 overflow-hidden relative">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="flex justify-between items-end">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  {event.title}
                </h2>
                {logo && <img src={logo} alt={""} className="h-6 md:h-8" />}
              </div>
              <p className="text-neutral-400 mt-2 max-md:mt-0">
                {truncateDescription(event.description, wordLimit)}
                {event.description &&
                  event.description.split(" ").length > wordLimit && (
                    <button
                      onClick={() => setOpenDialog(true)}
                      className="text-blue-400 max-sm:text-sm"
                    >
                      {screen < 460 ? "Read Description" : "... Read More"}
                    </button>
                  )}
              </p>
            </div>

            <div>
              <div className="text-blue-400 mb-2">
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  Registration Form
                </a>
              </div>
              <div className="flex justify-between text-neutral-500 text-sm max-sm:text-xs">
                <div className="flex gap-1 items-center justify-center">
                  <span role="img" aria-label="Calendar">
                    📅
                  </span>
                  {formatDateTime(event.startDateTime).dateOnly}
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <span role="img" aria-label="Clock">
                    ⏰
                  </span>
                  {formatDateTime(event.startDateTime).timeOnly}
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <span role="img" aria-label="Location">
                    📍
                  </span>
                  {event.venue}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-lg:mx-8 max-md:mr-5 justify-end items-center mx-32">
        {(isEventCreator || isAdmin) && (
          <div className="flex gap-1">
            <Link href={`/events/${event._id}/update`}>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </Link>
            <DeleteConfirmation eventId={event._id} />
          </div>
        )}
      </div>

      {/* Dialog for full description */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button className="hidden" />
        </DialogTrigger>
        <DialogContent className="rounded-sm max-sm:w-[90%]">
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
            <DialogDescription>{event.description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventComponent;
