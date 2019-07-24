import mongoose, { Schema, Document } from "mongoose";

interface iMember extends Document {
  account: string;
  project: string;
}

const Member = new Schema({
  account: { type: mongoose.SchemaTypes.ObjectId },
  project: { type: mongoose.SchemaTypes.ObjectId }
});
export default mongoose.model<iMember>("Member", Member);
