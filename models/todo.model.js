import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    timeNeed: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    isDone: { type: Boolean, required: true, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
