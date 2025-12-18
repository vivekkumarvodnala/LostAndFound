import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ["lost", "found"], required: true },
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location:{ type: String},
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
