import { useState } from "react";
import { CreateTaskInput } from "../types";
import { CheckIcon, PlusCircleIcon } from "@heroicons/react/20/solid";

interface TaskFormProps {
  initialData?: {
    title: string;
    color: string;
  };
  onSubmit: (data: CreateTaskInput) => void;
  onCancel: () => void;
}

export default function TaskForm({
  initialData,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [color, setColor] = useState(initialData?.color || "gray");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, color });
  };

  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "brown",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-4">
      <button type="button" onClick={onCancel} className="text-blue-500">
        ←
      </button>
      <div>
        <label className="block text-sm font-bold text-[#4ea8de] mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. Brush your teeth"
          required
          className="w-full px-4 py-2 text-sm text-white bg-[#262626] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ea8de]"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#4ea8de] mb-2">
          Color
        </label>
        <div className="flex space-x-3">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              className={`w-10 h-10 rounded-full ${
                color === c ? "ring-4 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              aria-label={`Select ${c} color`}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-[#1e6f9f] text-white text-sm font-bold rounded-md hover:bg-[#155a75] flex justify-center items-center"
      >
        {initialData ? "Save" : "Add Task"}{" "}
        {initialData ? (
          <CheckIcon className="w-5 h-5 ml-2" />
        ) : (
          <PlusCircleIcon className="w-5 h-5 ml-2" />
        )}
      </button>
    </form>
  );
}
