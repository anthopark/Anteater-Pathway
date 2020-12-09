import { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { AppContext } from '@components/AppContextProvider';
import LeftSideBar from '@components/leftsidebar';
import MainPanel from '@components/mainPanel';
import RightPanel from '@components/rightPanel';

import {
    PageContainer,
    LeftPanelContainer,
    MainPanelContainer,
    RightPanelContainer,
} from '@components/layout';

const getQuarterCourses = (droppableId, planData) => {

    for (let i = 0; i < planData.length; i++) {
        if (Array.isArray(planData[i][droppableId])) {
            return planData[i][droppableId];
        }
    }
}

const Page = () => {
    const { planData, setPlanData } = useContext(AppContext);
    const { searchedCourses, setSearchedCourses } = useContext(AppContext);
    const { plannedCourses, setPlannedCourses, } = useContext(AppContext);
    const { currentClickedCourse } = useContext(AppContext);

    console.log('planData\n', planData);
    console.log('searchedCourses\n', searchedCourses);
    console.log('plannedCourses\n', plannedCourses);
    console.log('currentClickedCourse\n', currentClickedCourse);

    const onDragEnd = (result) => {
        console.log(result);
        const { source, destination, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === 'search-result') return;

        if (source.droppableId === 'search-result') {
            // moved from search result to one of the quarters

            // update plannedCourses first, then move
            updatePlannedCourses(draggableId);

            // move 
            const newPlanData = [...planData];
            const newSearchedCourses = [...searchedCourses];
            const quarterCourses = getQuarterCourses(destination.droppableId, newPlanData);

            const [removed] = newSearchedCourses.splice(source.index, 1);
            quarterCourses.splice(destination.index, 0, removed._id);

            setPlanData(newPlanData);
        } else if (source.droppableId !== 'search-result' && source.droppableId !== destination.droppableId) {
            // moved from one quarter to the other
            
            const newPlanData = [...planData];
            const fromQuarterCourses = getQuarterCourses(source.droppableId, newPlanData);
            const toQuarterCourses = getQuarterCourses(destination.droppableId, newPlanData);

            const [removed] = fromQuarterCourses.splice(source.index, 1);
            toQuarterCourses.splice(destination.index, 0, removed);

            setPlanData(newPlanData);
        } else if (source.droppableId === destination.droppableId) {
            // moved to the same quarter -> reorder
            const newPlanData = [...planData];
            const quarterCourses = getQuarterCourses(source.droppableId, newPlanData);

            const [removed] = quarterCourses.splice(source.index, 1);
            quarterCourses.splice(destination.index, 0, removed);

            setPlanData(newPlanData);
        }
    };

    const updatePlannedCourses = (courseId) => {
        const newPlannedCourses = { ...plannedCourses };
        newPlannedCourses[courseId] = searchedCourses.filter((course) => course._id === courseId)[0];
        setPlannedCourses(newPlannedCourses);
    }

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
                <RightPanel />
            </RightPanelContainer>
        </PageContainer>
    );
}

export default Page;