"use client";
import React, { createContext, useState, useContext } from "react";
const TodoContext = createContext();

const todos_array = [
  {
    id: 1,
    title: "Buy groceries",
    desc: "Milk, bread, eggs, and fruits from the supermarket.",
    time: "09:00",
    isDone: false,
  },
  {
    id: 2,
    title: "Team meeting",
    desc: "Project sync with the development team on Zoom.",
    time: "10:30",
    isDone: true,
  },
  {
    id: 3,
    title: "Workout",
    desc: "Cardio session at the gym for 45 minutes.",
    time: "07:00",
    isDone: true,
  },
  {
    id: 4,
    title: "Call with client",
    desc: "Discuss project requirements and timelines.",
    time: "14:00",
    isDone: false,
  },
  {
    id: 5,
    title: "Code review",
    desc: "Review pull requests and leave comments.",
    time: "11:30",
    isDone: false,
  },
  {
    id: 6,
    title: "Write blog post",
    desc: "Draft blog post about React performance tips.",
    time: "16:00",
    isDone: false,
  },
  {
    id: 7,
    title: "Laundry",
    desc: "Wash and fold clothes.",
    time: "18:00",
    isDone: true,
  },
  {
    id: 8,
    title: "Read book",
    desc: "Read 30 pages of 'Atomic Habits'.",
    time: "21:00",
    isDone: false,
  },
  {
    id: 9,
    title: "Dinner with family",
    desc: "Try out new restaurant nearby.",
    time: "19:30",
    isDone: true,
  },
  {
    id: 10,
    title: "Plan next day",
    desc: "Set goals and tasks for tomorrow.",
    time: "22:00",
    isDone: false,
  },
];

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(todos_array);

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);
