import Plusicon from "../icons/Plusicon.tsx";
import { useMemo, useState } from "react";
import { Column, Id, Task } from "../types.ts";
import ColumnContainer from "./ColumnContainer.tsx";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function TaskBorder() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensor = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

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

  function updateColumn(id: Id, title: string) {
    const newColumn = columns.map(col => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumn);
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(
        col => col.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(col => col.id === overColumnId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId: columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTask = tasks.filter(task => task.id !== id);
    setTasks(newTask);
  }

  return (
    <div
      className="m-auto flex items-center
    min-h-screen w-full
    overflow-x-auto overflow-y-hidden px-10"
    >
      <DndContext
        sensors={sensor}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column: Column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter(task => task.columnId === column.id)}
                />
              ))}
            </SortableContext>
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
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default TaskBorder;
