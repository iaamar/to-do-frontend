import { Task } from "../types";
import clsx from "clsx";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/20/solid";
interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete(task.id);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onToggle(task.id);
  };

  return (
    <Link href={`/edit/${task.id}`}>
      <div
        className={clsx(
          "p-4 rounded-lg transition-all hover:shadow-lg cursor-pointer bg-[#262626]"
        )}
      >
        <div className="flex items-start justify-between">
          <input
            type="radio"
            checked={task.completed}
            onClick={handleCheckboxClick}
            className="w-5 h-5 flex-shrink-0 mt-1"
          />
          <div className="flex-grow mx-3 overflow-hidden">
            <span
              className={clsx("text-sm break-words text-white", {
                "line-through text-gray-400": task.completed,
              })}
            >
              {task.title}
            </span>
          </div>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-grey-700 flex-shrink-0 ml-2"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
