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
  Active,
  Over,
  CollisionDetection,
  pointerWithin,
  getFirstCollision,
  closestCenter,
} from '@dnd-kit/core';
import { RectMap } from '@dnd-kit/core/dist/store';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import { Term } from '@entities/academic-year';
import { ICourse } from '@entities/course';
import useAppUser from '@hooks/useAppUser';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

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

const overFromQuarterToQuarter = (active: Active, over: Over) => {
  const activeContainerId = active.data.current?.sortable?.containerId;
  let overContainerId = getOverContainerId(over);

  return (
    activeContainerId.startsWith('quarter') &&
    overContainerId.startsWith('quarter')
  );
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

const getQuarterTerm = (id: UniqueIdentifier): [number, Term] => {
  const [year, term] = (id as string).split('-').slice(1, 3);
  return [parseInt(year), term as Term];
};

function CourseItemDndProvider({ children }: { children: ReactNode }) {
  const { appUser, updateAppUser } = useAppUser();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const lastOverYearTop = useRef<{ id: string; top: number | null } | null>(
    null
  );
  const recentlyMovedToNewContainer = useRef(false);
  const [draggingCourse, setDraggingCourse] = useState<DraggingCourse | null>(
    null
  );
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  /**
   * To handle the case where the position of AcademicYear does not update
   * when the accordion is opened during the dragging session.
   */
  const isOverYearPositionNotUpdated = useCallback(
    (overId: string, args: { droppableRects: RectMap }) => {
      return (
        overId &&
        (overId as string).startsWith('year') &&
        lastOverYearTop.current !== null &&
        lastOverYearTop.current.id < overId &&
        lastOverYearTop.current.top !== null &&
        Math.abs(
          lastOverYearTop.current.top - args.droppableRects.get(overId!)!.top
        ) < 100
      );
    },
    [lastOverYearTop.current]
  );

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? pointerIntersections
          : pointerIntersections;

      let overId = getFirstCollision(intersections, 'id');

      if (isOverYearPositionNotUpdated(overId as string, args)) {
        return [];
      }

      if (overId !== null) {
        let courseIds: string[] | undefined;

        if ((overId as string).startsWith('quarter')) {
          const [year, term] = getQuarterTerm(overId);
          courseIds = appUser
            .getQuarterCourses(year, term)
            .map((course) => course?.id);
        } else if (overId === 'bag') {
          courseIds = appUser.courseBag.map((course) => course.id);
        }

        if (courseIds && courseIds.length > 0) {
          // If a container is matched and it contains courses
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                courseIds!.includes(container.id as string)
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;

        if (overId && (overId as string).startsWith('year')) {
          lastOverYearTop.current = {
            id: overId as string,
            top: args.droppableRects.get(overId)?.top ?? null,
          };
        }

        return [{ id: overId }];
      }

      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, appUser]
  );

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
      if (overWithinTheSameContainer(active, over)) return;

      recentlyMovedToNewContainer.current = true;

      if (overFromQuarterToBag(active, over)) {
        updateAppUser((draft) => {
          const [year, term] = getQuarterTerm(
            active.data.current?.sortable?.containerId
          );
          const quarterCourses = draft.getQuarterCourses(year, term);
          const courseBag = draft.courseBag;
          const courseToMove = quarterCourses.find(
            (course) => course.id === active.id
          );

          if (!courseToMove) return;

          const overIndex = over.data.current?.sortable?.index;
          const newIndex = overIndex >= 0 ? overIndex : 0;

          draft.setQuarterCourses(
            year,
            term,
            quarterCourses.filter((course) => course.id !== active.id)
          );

          draft.courseBag = [
            ...courseBag.slice(0, newIndex),
            courseToMove,
            ...courseBag.slice(newIndex),
          ];
        });
      } else if (overFromBagToQuarter(active, over)) {
        updateAppUser((draft) => {
          const [year, term] = getQuarterTerm(getOverContainerId(over));
          const quarterCourses = draft.getQuarterCourses(year, term);
          const courseBag = draft.courseBag;
          const courseToMove = draft.courseBag.find(
            (course) => course.id === active.id
          );

          if (!courseToMove) return;

          const overIndex = over.data.current?.sortable?.index;

          const isBelowOver =
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height / 2;

          const modifier = isBelowOver ? 1 : 0;

          const newIndex = overIndex >= 0 ? overIndex + modifier : 0;

          draft.courseBag = courseBag.filter(
            (course) => course.id !== active.id
          );
          draft.setQuarterCourses(year, term, [
            ...quarterCourses.slice(0, newIndex),
            courseToMove,
            ...quarterCourses.slice(newIndex),
          ]);
        });
      } else if (overFromQuarterToQuarter(active, over)) {
        updateAppUser((draft) => {
          const [activeYear, activeTerm] = getQuarterTerm(
            active.data.current?.sortable?.containerId
          );
          const [overYear, overTerm] = getQuarterTerm(getOverContainerId(over));
          const fromQuarterCourses = draft.getQuarterCourses(
            activeYear,
            activeTerm
          );
          const toQuarterCourses = draft.getQuarterCourses(overYear, overTerm);

          const courseToMove = draft
            .getQuarterCourses(activeYear, activeTerm)
            .find((course) => course.id === active.id);

          if (!courseToMove) return;

          const overIndex = over.data.current?.sortable?.index;

          const isBelowOver =
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height / 2;

          const modifier = isBelowOver ? 1 : 0;

          const newIndex = overIndex >= 0 ? overIndex + modifier : 0;

          draft.setQuarterCourses(
            activeYear,
            activeTerm,
            fromQuarterCourses.filter((course) => course.id !== active.id)
          );

          draft.setQuarterCourses(overYear, overTerm, [
            ...toQuarterCourses.slice(0, newIndex),
            courseToMove,
            ...toQuarterCourses.slice(newIndex),
          ]);
        });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over !== null && active.id !== over.id) {
      if (endWithinBag(active, over)) {
        updateAppUser((draft) => {
          const courseIds = draft.courseBag.map((course) => course.id);
          const oldIndex = courseIds.indexOf(active.id as string);
          const newIndex = courseIds.indexOf(over.id as string);

          draft.courseBag = arrayMove(draft.courseBag, oldIndex, newIndex);
        });
      } else if (endWithinSameQuarter(active, over)) {
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
    lastOverYearTop.current = null;
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setDraggingCourse(null);
  };

  useEffect(() => {
    recentlyMovedToNewContainer.current = false;
  }, [appUser]);

  return (
    <DndContext
      id={'0'}
      modifiers={[restrictToWindowEdges]}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
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
