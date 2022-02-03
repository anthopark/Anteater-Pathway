import { useGlobalObjects } from "@components/GlobalContextProvider";
import { DragDropContext } from "react-beautiful-dnd";
import { useSavePlanner } from "src/hooks/useSavePlanner";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  sourceArr,
  destinationArr,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(sourceArr);
  const destClone = Array.from(destinationArr);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const DragDropContextProvider = ({ children }) => {
  const { appUser, updateAppUser } = useGlobalObjects();
  const { savePlannerToBackend } = useSavePlanner();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sId = source.droppableId;
    const dId = destination.droppableId;

    console.log(result);

    if (sId.startsWith("tp") && dId.startsWith("tp")) {
      // tentative planner -> tentative planner
      if (sId === dId) {
        // reorder
        const newCourseItems = reorder(
          appUser.tentativePlanner.findDroppable(sId),
          source.index,
          destination.index
        );

        appUser.tentativePlanner.updateDroppable(sId, newCourseItems);
      } else {
        // move
        const result = move(
          appUser.tentativePlanner.findDroppable(sId),
          appUser.tentativePlanner.findDroppable(dId),
          source,
          destination
        );

        appUser.tentativePlanner.updateDroppable(sId, result[sId]);
        appUser.tentativePlanner.updateDroppable(dId, result[dId]);
      }
    } else if (sId.startsWith("tp") && dId.startsWith("p")) {
      // tentative planner -> planner
      const result = move(
        appUser.tentativePlanner.findDroppable(sId),
        appUser.planner.findDroppable(dId),
        source,
        destination
      );

      appUser.tentativePlanner.updateDroppable(sId, result[sId]);
      appUser.planner.updateDroppable(dId, result[dId]);
    } else if (sId.startsWith("p") && dId.startsWith("tp")) {
      // planner -> tentative planner
      const result = move(
        appUser.planner.findDroppable(sId),
        appUser.tentativePlanner.findDroppable(dId),
        source,
        destination
      );

      appUser.planner.updateDroppable(sId, result[sId]);
      appUser.tentativePlanner.updateDroppable(dId, result[dId]);
    } else if (sId.startsWith("p") && dId.startsWith("p")) {
      // planner -> planner
      if (sId === dId) {
        // reorder
        const newCourseItems = reorder(
          appUser.planner.findDroppable(sId),
          source.index,
          destination.index
        );

        appUser.planner.updateDroppable(sId, newCourseItems);
      } else {
        // move
        const result = move(
          appUser.planner.findDroppable(sId),
          appUser.planner.findDroppable(dId),
          source,
          destination
        );

        appUser.planner.updateDroppable(sId, result[sId]);
        appUser.planner.updateDroppable(dId, result[dId]);
      }
    }

    updateAppUser(appUser);
    savePlannerToBackend(appUser);
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
