import mongoose, { Schema, Document } from "mongoose";

interface IIssue extends Document {
  project: string;
  title: string;
  content: string;
  open: boolean;
}

const Issue = new Schema({
  project: { type: mongoose.SchemaTypes.ObjectId },
  title: String,
  content: String,
  viewCount: { type: Number, default: 0 },
  open: { type: Boolean, default: true }
});

export default mongoose.model<IIssue>("Issue", Issue);
