import { CourseInfoBox } from '@components/courseItem/styled';
import CourseInfoCard from './CourseInfoCard'

import {
    RightPanelContainer
} from './styled';

export const RightPanel = () => {
    return (
        <RightPanelContainer>
            <CourseInfoCard />
        </RightPanelContainer>
    );
}