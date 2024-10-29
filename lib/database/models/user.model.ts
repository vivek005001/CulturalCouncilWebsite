import { Schema, model, models, Document } from "mongoose";

// Define the interface for the User model
export interface IUser extends Document {
  clerkId: string;
  email: string;
}

// Define the User schema
const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  clubName: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isClub: { type: Boolean, default: false },
});

const User = models.User || model("User", UserSchema);

export default User;
