import SortableCourseItem from '@components/index-page/SortableCourseItem/SortableCourseItem';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverEvent,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import useAppUser from '@hooks/useAppUser';
import { ReactNode, useState } from 'react';

function CourseItemDndProvider({ children }: { children: ReactNode }) {
  const { updateAppUser } = useAppUser();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      updateAppUser((draft) => {
        const courseIds = draft.courseBag.map((course) => course.id);
        const oldIndex = courseIds.indexOf(active.id as string);
        const newIndex = courseIds.indexOf(over!.id as string);

        draft.courseBag = arrayMove(draft.courseBag, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      id={'0'}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges]}
      sensors={sensors}
    >
      {children}
      <DragOverlay adjustScale>
        {activeId ? (
          <SortableCourseItem sortableId={activeId} isInCourseBag={false} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default CourseItemDndProvider;
