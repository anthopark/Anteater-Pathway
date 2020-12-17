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
    IllustImage,
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
                                                    {currentClickedCourse[info.field]}
                                                </AdditionalInfoText>
                                            </AdditionalInfoBox>
                                        )
                                    }
                                })
                            }
                        </CourseInfoCardContainer>


                    )
                    : (
                        <CourseInfoCardContainer>
                            <IllustImage src='/illust-1.svg' />
                        </CourseInfoCardContainer>
                    )
            }
        </>
    );
}

export default CourseInfoCard;