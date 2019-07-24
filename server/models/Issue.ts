import mongoose, { Schema, Document } from "mongoose";

interface IIssue extends Document {
  project: string;
  title: string;
}

const Issue = new Schema({
  project: { type: mongoose.SchemaTypes.ObjectId },
  title: String
});

export default mongoose.model<IIssue>("Issue", Issue);
