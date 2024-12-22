"use client";

import { useEffect, useState } from "react";
import { Task } from "./types";
import TaskCard from "./components/TaskCard";
import Link from "next/link";
import {
  ClipboardDocumentListIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`
      );
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setError("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };
  if (isLoading) {
    return <div className="flex justify-center p-8 text-white">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="space-y-4 px-4">
      <div className="flex justify-center mb-12 -mt-14">
        <Link
          href="/create"
          className="w-full px-6 py-3 flex items-center justify-center bg-[#1e6f9f] text-white rounded-md"
        >
          Create Task <PlusCircleIcon className="w-5 h-5 ml-2" />
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold text-[#4ea8de]">
          Tasks{" "}
          <span className="rounded-lg px-2 bg-slate-600 text-xs text-white">
            {tasks.length}
          </span>
        </h2>
        <h2 className="text-sm font-bold text-[#5f60ce]">
          Completed{" "}
          <span className="rounded-lg px-1 bg-slate-600 text-xs text-white">
            {completedCount} of {tasks.length}
          </span>
        </h2>
      </div>
      {tasks.length === 0 ? (
        <div className="flex flex-col py-10 items-center justify-center text-center space-y-4">
          <ClipboardDocumentListIcon className="w-16 h-16 text-gray-500" />
          <p className="text-lg font-bold text-gray-300">
            You don't have any tasks registered yet.
          </p>
          <p className="text-sm text-gray-500">
            Create tasks and organize your to-do items.
          </p>
        </div>
      ) : (
        <div className="space-y-4 space-x-1">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
