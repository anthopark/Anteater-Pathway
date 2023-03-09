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
import { Term } from '@entities/academic-year';
import { ICourse } from '@entities/course';
import useAppUser from '@hooks/useAppUser';
import { ReactNode, useState } from 'react';

interface DraggingCourse {
  id: string;
  deptCode: string;
  num: string;
  color: number;
}

const getOverContainerId = (over: Over) => {
  return (over.id as string).startsWith('course')
    ? over.data.current?.sortable?.containerId
    : over.id;
};

const overWithinTheSameContainer = (active: Active, over: Over) => {
  const activeContainerId = active.data.current?.sortable?.containerId;
  let overContainerId = getOverContainerId(over);

  return activeContainerId === overContainerId;
};

const overFromQuarterToBag = (active: Active, over: Over) => {
  const activeContainerId = active.data.current?.sortable?.containerId;
  let overContainerId = getOverContainerId(over);

  return activeContainerId.startsWith('quarter') && overContainerId === 'bag';
};

const overFromBagToQuarter = (active: Active, over: Over) => {
  const activeContainerId = active.data.current?.sortable?.containerId;
  let overContainerId = getOverContainerId(over);

  return activeContainerId === 'bag' && overContainerId.startsWith('quarter');
};

const endWithinBag = (active: Active, over: Over): boolean => {
  return (
    active.data.current?.sortable?.containerId === 'bag' &&
    over.data.current?.sortable?.containerId === 'bag'
  );
};

const endWithinSameQuarter = (active: Active, over: Over): boolean => {
  return (
    active.data.current?.sortable?.containerId.startsWith('quarter') &&
    active.data.current?.sortable?.containerId ===
      over.data.current?.sortable?.containerId
  );
};

const getQuarterTerm = (id: string): [number, Term] => {
  const [year, term] = id.split('-').slice(1, 3);
  return [parseInt(year), term as Term];
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

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (over !== null && active.id !== over.id) {
      // console.log(event);
      if (overWithinTheSameContainer(active, over)) {
        console.log('same container');
        return;
      } else if (overFromQuarterToBag(active, over)) {
        // console.log('from quarter to bag');
        updateAppUser((draft) => {
          const [year, term] = getQuarterTerm(
            active.data.current?.sortable?.containerId
          );
          const courseToMove = draft
            .getQuarterCourses(year, term)
            .find((course) => course.id === active.id);

          let newIndex: number;

          if (over.data.current?.sortable?.index >= 0) {
            newIndex = over.data.current?.sortable?.index;
          } else {
            newIndex = draft.courseBag.length;
          }

          // remove course from the quarter
          draft.setQuarterCourses(
            year,
            term,
            draft
              .getQuarterCourses(year, term)
              .filter((course) => course.id !== active.id)
          );

          draft.courseBag = [
            ...draft.courseBag.slice(0, newIndex),
            courseToMove,
            ...draft.courseBag.slice(newIndex),
          ] as ICourse[];
        });
      } else if (overFromBagToQuarter(active, over)) {
        // console.log('from bag to quarter');
        updateAppUser((draft) => {
          const [year, term] = getQuarterTerm(getOverContainerId(over));
          const courseToMove = draft.courseBag.find(
            (course) => course.id === active.id
          );

          let newIndex: number;

          if (over.data.current?.sortable?.index >= 0) {
            newIndex = over.data.current?.sortable?.index;
          } else {
            newIndex = draft.getQuarterCourses(year, term).length;
          }

          draft.courseBag = draft.courseBag.filter(
            (course) => course.id !== active.id
          );

          draft.setQuarterCourses(year, term, [
            ...draft.getQuarterCourses(year, term).slice(0, newIndex),
            courseToMove!,
            ...draft.getQuarterCourses(year, term).slice(newIndex),
          ]);
        });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log('active:', active);
    console.log('over:', over);

    if (over !== null && active.id !== over.id) {
      if (endWithinBag(active, over)) {
        updateAppUser((draft) => {
          const courseIds = draft.courseBag.map((course) => course.id);
          const oldIndex = courseIds.indexOf(active.id as string);
          const newIndex = courseIds.indexOf(over.id as string);

          draft.courseBag = arrayMove(draft.courseBag, oldIndex, newIndex);
        });
      } else if (endWithinSameQuarter(active, over)) {
        console.log('withinQuarter');
        const [year, term] = getQuarterTerm(
          active.data.current?.sortable?.containerId
        );
        updateAppUser((draft) => {
          const courseIds = draft
            .getQuarterCourses(year, term)
            .map((course) => course.id);
          const oldIndex = courseIds.indexOf(active.id as string);
          const newIndex = courseIds.indexOf(over.id as string);

          draft.setQuarterCourses(
            year,
            term,
            arrayMove(draft.getQuarterCourses(year, term), oldIndex, newIndex)
          );
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
      // collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges]}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
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
