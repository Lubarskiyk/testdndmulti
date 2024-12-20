import { Id, Task } from "../types.ts";
import TrashIcon from "../icons/TrashIcon.tsx";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
}

function TaskCard({ task, deleteTask }: TaskCardProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  return (
    <div
      className="bg-mainBackgroundColor p-2.5 h-24 min-h-24 flex items-center text-left rounded-xl
        hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {task.content}
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded-md opacity-50
        hover:opacity-100
        "
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
