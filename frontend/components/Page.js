import { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { AppContext } from '@components/AppContextProvider';
import LeftSideBar from '@components/leftsidebar';
import MainPanel from '@components/mainPanel';

import {
    PageContainer,
    LeftPanelContainer,
    MainPanelContainer,
    RightPanelContainer,
} from '@components/layout';

const Page = () => {
    const { planData, setPlanData } = useContext(AppContext);
    const { searchedCourses, setSearchedCourses } = useContext(AppContext);

    console.log(planData);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;
        if (destination.droppableId === 'search-result') return;
        
        if (source.droppableId === 'search-result') {
            // moved from search result to a quarter

            // update plannedCourses

        } else if (source.droppableId !== 'search-result' && source.droppableId !== destination.droppableId) {
            // moved from one quarter to the other
        }else if (source.droppableId === destination.droppableId) {
            // moved to the same quarter
        }
    };

    return (
        <PageContainer>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <LeftPanelContainer>
                    <LeftSideBar />
                </LeftPanelContainer>

                <MainPanelContainer>
                    <MainPanel />
                </MainPanelContainer>
            </DragDropContext>

            <RightPanelContainer>
                Right Panel
            </RightPanelContainer>
        </PageContainer>
    );
}

export default Page;