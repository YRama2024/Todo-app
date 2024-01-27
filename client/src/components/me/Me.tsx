import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { BASE_URL } from "../env_var";
import "./index.css";

export function Me() {
  interface Todo {
    _id: string;
    title: string;
    description: string;
    done: boolean;
  }
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const showTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos/getTodos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("userId"),
        },
      });
      setTodos(response.data);
      console.log(todos);
      localStorage.setItem("todos", response.data);
    } catch (error) {
      console.log("error getting todos", error);
    }
  };

  useEffect(() => {
    showTodos();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/todos/addTodo`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(localStorage.getItem("token"));
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("error adding todo ", error);
    }
    // display todos
    showTodos();
  }

  const handleDelete = async (title: string) => {
    try {
      await axios.delete(`${BASE_URL}/todos/deleteTodo`, {
        data: {
          userId: localStorage.getItem("userId"),
          title: title,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTodos((prevTodo) => prevTodo.filter((todo) => todo.title != title));
    } catch (error) {
      console.log("error deleting a todo", error);
    }
  };

  return (
    <>
      <form className="todo-input" onSubmit={handleSubmit}>
        <input
          className="todo-input-title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="todo-input-description"
          value={description}
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="todo-input-button">Add todo</button>
      </form>
      <h3 className="heading">Todo's</h3>
      <ul className="todo-list-ul">
        {todos.map((todo) => (
          <li className={"todo-list-li"} key={todo._id}>
            {todo.title} - {todo.description}{" "}
            <button onClick={() => handleDelete(todo.title)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
