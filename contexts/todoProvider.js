"use client";
import { convertDateforUser } from "@/utils/formatDate";
import React, { createContext, useState, useContext, useEffect } from "react";
const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodo() {
      const res = await fetch("/api/todos");
      const { data } = await res.json();

      // logic for changing dueDate format
      data.forEach((todo) => {
        todo.dueDate = convertDateforUser(todo.dueDate);

        return todo;
      });

      setTodos(data);
    }

    fetchTodo();
  }, []);

  const deleteTodo = (_id) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== _id));
  };

  const editTodo = async (todo) => {
    const { _id, ...updatedTodo } = todo;
    const res = await fetch(`/api/todos?tid=${_id}`, {
      method: "PUT",
      headers: {
        "Conten-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    const data = await res.json();

    if (data.success) {
      setTodos((prev) =>
        prev.filter((todo) => {
          if (todo._id === _id) {
            todo = data;
          }
          return todo;
        })
      );
    }
  };

  const toggleTodo = (_id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === _id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const addnewTodo = async (newTodo) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Conten-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    const { data } = await res.json();

    if (data.success) {
      setTodos((prev) => [...prev, data]);
    }
  };
  return (
    <TodoContext.Provider
      value={{ todos, deleteTodo, editTodo, toggleTodo, addnewTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);
