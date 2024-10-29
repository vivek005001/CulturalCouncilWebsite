import { Document, Schema, model, models } from "mongoose";

// Define the interface for the Event model
export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  venue?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  url?: string;
  organizer: { _id: string; clubName: string };
}

// Define the Event schema
const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  venue: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
  startDateTime: { type: Date, default: Date.now, required: true },
  endDateTime: { type: Date, default: Date.now, required: true },
  url: { type: String },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
