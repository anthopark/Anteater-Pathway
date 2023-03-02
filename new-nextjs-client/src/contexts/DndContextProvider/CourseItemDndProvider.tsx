import SortableCourseItem from '@components/index-page/SortableCourseItem/SortableCourseItem';
import {
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
  closestCenter,
  Active,
  Over,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import { ICourse } from '@entities/course';
import useAppUser from '@hooks/useAppUser';
import { ReactNode, useState } from 'react';

interface DraggingCourse {
  id: string;
  deptCode: string;
  num: string;
  color: number;
}

const withinCourseBag = (active: Active, over: Over): boolean => {
  return (
    active.data.current?.sortable?.containerId === 'course-bag' &&
    over.data.current?.sortable?.containerId === 'course-bag'
  );
};

const fromCourseBagToEmptyQuarter = (active: Active, over: Over): boolean => {
  return (
    active.data.current?.sortable?.containerId === 'course-bag' &&
    (over.id as string).startsWith('quarter')
  );
};

function CourseItemDndProvider({ children }: { children: ReactNode }) {
  const { updateAppUser } = useAppUser();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [draggingCourse, setDraggingCourse] = useState<DraggingCourse | null>(
    null
  );
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingCourse({
      id: `overlay-${event.active.id}`,
      deptCode: event.active.data.current!.deptCode,
      num: event.active.data.current!.num,
      color: event.active.data.current!.color,
    });
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log('active:', active);
    console.log('over:', over);

    if (over !== null && active.id !== over.id) {
      if (withinCourseBag(active, over)) {
        updateAppUser((draft) => {
          const courseIds = draft.courseBag.map((course) => course.id);
          const oldIndex = courseIds.indexOf(active.id as string);
          const newIndex = courseIds.indexOf(over.id as string);

          draft.courseBag = arrayMove(draft.courseBag, oldIndex, newIndex);
        });
      } else if (fromCourseBagToEmptyQuarter(active, over)) {
        updateAppUser((draft) => {
          draft.removeCourseItem(active.id as string, true);
        });
      }
    }
    setActiveId(null);
    setDraggingCourse(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setDraggingCourse(null);
  };

  return (
    <DndContext
      id={'0'}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToWindowEdges]}
      sensors={sensors}
    >
      {children}
      <DragOverlay>
        {activeId ? (
          <SortableCourseItem
            course={
              {
                id: draggingCourse!.id,
                deptCode: draggingCourse!.deptCode,
                num: draggingCourse!.num,
                color: draggingCourse!.color,
              } as ICourse
            }
            isInCourseBag={false}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default CourseItemDndProvider;
