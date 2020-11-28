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

    const { searchedCourses, setSearchedCourses } = useContext(AppContext);

    const onDragEnd = (result) => {
        const { source, destination } = result;
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