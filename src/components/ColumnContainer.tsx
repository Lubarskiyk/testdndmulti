import { Column, Id, Task } from "../types.ts";
import TrashIcon from "../icons/TrashIcon.tsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Plusicon from "../icons/Plusicon.tsx";
import TaskCard from "./TaskCard.tsx";

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer(props: ColumnContainerProps) {
  const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask } =
    props;

  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-80 h-[32rem] max-h-[32rem] flex flex-col rounded-md opacity-50 border border-rose-500"
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-80 h-[32rem] max-h-[32rem] flex flex-col rounded-md "
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-mainBackgroundColor text-md h-14
      p-3
      rounded-md
      rounded-b-none
      font-bold
      border-4
      border-columnBackgroundColor
      flex
      items-center
      justify-between
      "
      >
        <div className="flex gap-2">
          <div className="flex items-center justify-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={e => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={e => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
        >
          <TrashIcon />
        </button>
      </div>

      <div className="flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-auto px-2.5">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </div>

      <button
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor
      hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <Plusicon />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
