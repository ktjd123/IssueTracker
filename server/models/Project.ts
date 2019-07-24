import mongoose, { Schema, Document } from "mongoose";

interface IProject extends Document {
  title: string;
  ing: boolean;
}

const Project: Schema = new Schema({
  title: String,
  ing: { type: Boolean, default: true }
});

export default mongoose.model<IProject>("Project", Project);
