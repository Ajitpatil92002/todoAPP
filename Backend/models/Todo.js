import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: true,
  },
});

const Todos = mongoose.model("todos", TodoSchema);
export default Todos;
