"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Event from "@/lib/database/models/event.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

import {
  CreateEventParams,
  UpdateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
} from "@/types";

const populateEvent = (query: any) => {
  return query.populate({
    path: "organizer",
    model: User,
    select: "_id clubName",
  });
};
type Event = {
  title: string;
  description: string;
  venue: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  url: string;
};
type EventParam = {
  event: Event;
  eventId?: string;
};
const isOverlapping = async ({ event, eventId }: EventParam) => {
  const { startDateTime, endDateTime } = event;
  const excludedId = eventId ? eventId : null;
  console.log(excludedId);
  const events = await Event.find({
    $and: [
      {
        $or: [
          { startDateTime: { $gte: startDateTime, $lt: endDateTime } },
          { endDateTime: { $gt: startDateTime, $lte: endDateTime } },
        ],
      },
      { _id: { $ne: excludedId } },
    ],
  });
  console.log(events);
  return {
    isOverlap: events.length > 0,
    OverlappingEvent: events.length > 0 ? events[0].title : null,
  };
};
// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    console.log(organizer);
    if (!organizer) throw new Error("Organizer not found");

    const Overlap = await isOverlapping({ event });

    if (Overlap.isOverlap) {
      return JSON.parse(
        JSON.stringify({
          message: "Event is overlapping",
          OverlappingEvent: Overlap.OverlappingEvent,
        })
      );
    }

    const newEvent = await Event.create({ ...event, organizer: userId });
    revalidatePath(path);

    return JSON.parse(
      JSON.stringify({ message: "success", newEvent: newEvent })
    );
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function getEventById(eventId: string) {
  try {
    await connectToDatabase();

    const event = await populateEvent(Event.findById(eventId));

    if (!event) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const Overlap = await isOverlapping({ event, eventId: event._id });

    if (Overlap.isOverlap) {
      return JSON.parse(
        JSON.stringify({
          message: "Event is overlapping",
          OverlappingEvent: Overlap.OverlappingEvent,
        })
      );
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify({ message: "success", updatedEvent }));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (deletedEvent) {
      revalidatePath(path);
    }
  } catch (error) {
    handleError(error);
  }
}

// GET ALL EVENTS
export async function getAllEvents({
  query,
  limit = 6,
  page,
}: GetAllEventsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const conditions = {
      $and: [titleCondition],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET EVENTS BY ORGANIZER
export async function getEventsByUser({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
