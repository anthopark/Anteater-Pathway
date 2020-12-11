import { useState, useContext } from 'react';

import { AppContext } from '@components/AppContextProvider';
import courseMetaData from '@data/course-metadata.json';

import {
    CourseInfoCardContainer,
    DeptNumBox,
    TitleBox,
    AdditionalInfoBox,
    InfoLabel,
    AdditionalInfoText,
} from './styled';

const CourseInfoCard = () => {

    const { currentClickedCourse } = useContext(AppContext);

    return (
        <>
            {
                currentClickedCourse ?
                    (
                        <CourseInfoCardContainer>
                            <DeptNumBox>
                                {`${currentClickedCourse.dept} ${currentClickedCourse.num}`}
                            </DeptNumBox>
                            <TitleBox>
                                {currentClickedCourse.title}
                            </TitleBox>
                            {
                                courseMetaData.courseExtraInfo.map((info, index) => {
                                    if (currentClickedCourse[info.field]) {
                                        return (
                                            <AdditionalInfoBox key={index}>
                                                <InfoLabel>{info.label}:</InfoLabel>
                                                <AdditionalInfoText>
                                                    {
                                                        currentClickedCourse[info.field].endsWith('.') ?
                                                            currentClickedCourse[info.field].slice(0, -1)
                                                            : currentClickedCourse[info.field]

                                                    }
                                                </AdditionalInfoText>
                                            </AdditionalInfoBox>
                                        )
                                    }
                                })
                            }
                        </CourseInfoCardContainer>


                    )
                    : undefined
            }
        </>
    );
}

export default CourseInfoCard;