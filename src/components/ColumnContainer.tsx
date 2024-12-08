import { Column, Id } from "../types.ts";
import TrashIcon from "../icons/TrashIcon.tsx";

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id) => void;
}

function ColumnContainer(props: ColumnContainerProps) {
  const { column, deleteColumn } = props;

  return (
    <div className="bg-columnBackgroundColor w-80 h-[32rem] max-h-[32rem] flex flex-col rounded-md ">
      <div
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
          {column.title}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
        >
          <TrashIcon />
        </button>
      </div>

      <div className="flex flex-grow"> Content</div>
      <div>Footer</div>
    </div>
  );
}

export default ColumnContainer;
