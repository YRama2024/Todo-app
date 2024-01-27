import jwt from "jsonwebtoken";
import express from "express";
import { authenticateJwt, SECRET } from "../middleware";
import { Todo } from "../db";

const router = express.Router();

// give -> auth token, title, description
router.post("/addTodo", authenticateJwt, async (req, res) => {
  let { title, description } = req.body;
  const done = false;
  const userId = req.headers.userId;
  try {
    const todo = await Todo.findOne({ userId: userId, title: title });
    if (todo) {
      res.json({ message: "todo already exists" });
    } else {
      const newTodo = new Todo({ title, description, done, userId});
      await newTodo.save();
      res.json({ message: "Todo added", userId: newTodo.userId });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "internal server error" });
  }
});

// give -> auth token, userId, title
router.delete("/deleteTodo", authenticateJwt, async (req, res) => {
  let userId = req.body.userId;
  let title = req.body.title;

  try {
    const todo = await Todo.findOneAndDelete({ userId: userId, title:title });
    if (todo) {
      res.json({ message: "todo deleted", deletedTodo:todo });
    } else {
      console.log("todo not found", userId);
      res.status(404).json({ message: "todo not found"});
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});
// takes -> auth token, userId
router.get("/getTodos", authenticateJwt, (req, res) => {
  try {
    const userId = req.headers.userId;
    console.log("userId:", userId);

    Todo.find({ userId: userId }).then((todos) => {
        console.log("todos:",todos);
      res.json(todos);
    });
  } catch (error) {
    res.sendStatus(500).json({ message: "internal server errorr" });
  }
});

export default router;

