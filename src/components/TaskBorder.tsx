import Plusicon from "../icons/Plusicon.tsx";
import { useState } from "react";
import { Column, Id } from "../types.ts";
import ColumnContainer from "./ColumnContainer.tsx";

function TaskBorder() {
  const [columns, setColumns] = useState<Column[]>([]);
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter(c => c.id !== id);
    setColumns(filteredColumns);
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
  return (
    <div
      className="m-auto flex items-center
    min-h-screen w-full
    overflow-x-auto overflow-y-hidden px-10"
    >
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((column: Column) => (
            <ColumnContainer
              key={column.id}
              column={column}
              deleteColumn={deleteColumn}
            />
          ))}
        </div>
        <button
          onClick={() => createNewColumn()}
          className="h-16 w-80 min-w-80 cursor-pointer rounded-lg bg-mainBackgroundColor
        border-2 border-columnBackgroundColor p-4 ring-rose-500 flex gap-2 hover:ring-2 "
        >
          <Plusicon />
          Add Column
        </button>
      </div>
    </div>
  );
}

export default TaskBorder;
