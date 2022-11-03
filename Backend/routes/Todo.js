import express from "express";
import VerifyToken from "../middlewares/authMiddleware.js";
import Todos from "../models/Todo.js";

const router = express.Router();

// http://localhost:5000/api/todos/
router.get("/", VerifyToken, async (req, res) => {
  try {
    const todos = await Todos.find({ user: req.user });
    res.json({
      status: true,
      msg: "All Todos",
      data: todos,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      msg: err.message,
      data: [],
    });
  }
});

// http://localhost:5000/api/todos/createTodo
router.post("/createTodo", VerifyToken, async (req, res) => {
  try {
    const todos = await Todos.create({ ...req.body, user: req.user });
    res.json({
      status: true,
      msg: "Todo's created successfully",
      data: todos,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      msg: err,
      data: [],
    });
  }
});

// http://localhost:5000/api/todos/edit/6360d3bcfff8ed94ee4291c0
router.put("/edit/:id", VerifyToken, async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const todos = await Todos.findByIdAndUpdate(
      id,
      {
        $set: {
          ...data,
        },
      },
      { new: true }
    );
    res.json({
      status: true,
      msg: "Todo's updated successfully",
      data: todos,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      msg: err,
      data: [],
    });
  }
});

// http://localhost:5000/api/todos/delete/6360d292207a3e8566925995
router.delete("/delete/:id", VerifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTodos = await Todos.findByIdAndDelete(id);
    if (deletedTodos === null) {
      return res.status(400).json({
        status: "error",
        msg: err,
        data: [],
      });
    }
    res.json({
      status: true,
      msg: "Todo's deletedf successfully",
      data: [],
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      msg: err,
      data: [],
    });
  }
});

export default router;
