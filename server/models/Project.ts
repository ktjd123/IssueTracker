import mongoose, { Schema, Document } from "mongoose";

interface IProject extends Document {
  title: string;
}

const Project: Schema = new Schema({
  title: String
});

export default mongoose.model<IProject>("Project", Project);
