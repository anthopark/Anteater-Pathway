import { DragDropContext } from "react-beautiful-dnd";

export const DragDropContextProvider = ({ children }) => {
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    console.log(source);
    console.log(destination);
  };
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
