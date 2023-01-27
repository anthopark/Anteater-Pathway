import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import useAppUser from '@hooks/useAppUser';
import { ReactNode } from 'react';

function DndContextProvider({ children }: { children: ReactNode }) {
  const { appUser, updateAppUser } = useAppUser();

  const handleDragEnd = (event: DragEndEvent) => {};

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      {children}
    </DndContext>
  );
}

export default DndContextProvider;
