"use client";
import React, { createContext, useState, useContext } from "react";
const TodoContext = createContext();

const todos_array = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, bread, eggs, and fruits from the supermarket.",
    timeNeed: 1,
    isDone: false,
  },
  {
    id: 2,
    title: "Team meeting",
    description: "Project sync with the development team on Zoom.",
    timeNeed: 2,
    isDone: true,
  },
  {
    id: 3,
    title: "Workout",
    description: "Cardio session at the gym for 45 minutes.",
    timeNeed: 1,
    isDone: true,
  },
  {
    id: 4,
    title: "Call with client",
    description: "Discuss project requirements and timelines.",
    timeNeed: 1,
    isDone: false,
  },
  {
    id: 5,
    title: "Code review",
    description: "Review pull requests and leave comments.",
    timeNeed: 1,
    isDone: false,
  },
  {
    id: 6,
    title: "Write blog post",
    description: "Draft blog post about React performance tips.",
    timeNeed: 2,
    isDone: false,
  },
  {
    id: 7,
    title: "Laundry",
    description: "Wash and fold clothes.",
    timeNeed: 1,
    isDone: true,
  },
  {
    id: 8,
    title: "Read book",
    description: "Read 30 pages of 'Atomic Habits'.",
    timeNeed: 1,
    isDone: false,
  },
  {
    id: 9,
    title: "Dinner with family",
    description: "Try out new restaurant nearby.",
    timeNeed: 2,
    isDone: true,
  },
  {
    id: 10,
    title: "Plan next day",
    description: "Set goals and tasks for tomorrow.",
    timeNeed: 1,
    isDone: false,
  },
];

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(todos_array);

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, title, description, timeNeed, isDone) => {
    setTodos((prev) =>
      prev.filter((todo) => {
        if (todo.id === id) {
          todo.title = title;
          todo.description = description;
          todo.timeNeed = timeNeed;
          todo.isDone = isDone;
        }
        return todo;
      })
    );
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todos, deleteTodo, editTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);
