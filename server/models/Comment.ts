import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {}

const Comment = new Schema({
  account: { type: mongoose.SchemaTypes.ObjectId },
  issue: { type: mongoose.SchemaTypes.ObjectId },
  content: String
});

export default mongoose.model<IComment>("Comment", Comment);
