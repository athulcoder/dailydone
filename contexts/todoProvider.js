"use client";
import { convertDateforUser } from "@/utils/formatDate";
import React, { createContext, useState, useContext, useEffect } from "react";
const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodo() {
      const res = await fetch("/api/todos");
      const { success, data } = await res.json();

      setTodos(data);
      setLoading(false);
    }

    fetchTodo();
  }, []);

  const deleteTodo = async (_id) => {
    // for better your experience first changing the state then sending patch request to server
    setTodos((prev) => prev.filter((todo) => todo._id !== _id));
    const res = await fetch(`/api/todos?tid=${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const editTodo = async (todo) => {
    const { _id, ...updatedTodo } = todo;
    const res = await fetch(`/api/todos?tid=${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    const { success, data } = await res.json();

    if (success) {
      setTodos((prev) =>
        prev.map((_todo) => (_todo._id === _id ? data : _todo))
      );
    }
    console.log(data);
  };

  const toggleTodo = async (_id, isDone) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === _id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
    const res = await fetch(`/api/todos?tid=${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: !isDone }),
    });
    const { success, data } = await res.json();
  };

  const addnewTodo = async (newTodo) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    const { success, data } = await res.json();

    if (success) {
      setTodos((prev) => [...prev, data]);
    }
  };
  return (
    <TodoContext.Provider
      value={{ todos, deleteTodo, editTodo, toggleTodo, addnewTodo, loading }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);
