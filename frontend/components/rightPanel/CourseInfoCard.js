import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowUp } from '@fortawesome/free-solid-svg-icons';

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
    PreviouslyOfferedBox,
    PreviousQuarter,
    ExpandToggleButtonBox,
    ExpandToggleButton,
    ExpandToggleButtonText,
} from './styled';


const CourseInfoCard = () => {

    const { currentClickedCourse } = useContext(AppContext);
    const [extraInfoList, setExtraInfoList] = useState([]);

    // decide whether to display "+ More..." Button 
    const [isLong, setIsLong] = useState(false);
    // state to track if the card is currently expanded or not
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (currentClickedCourse) {
            let infoArr = []
            for (const info of courseMetaData.courseExtraInfo) {
                if (info.field in currentClickedCourse) {
                    infoArr.push(info);
                }
            }

            if (infoArr.length > 3) {
                setIsLong(true);
            } else {
                setIsLong(false);
            }

            setExtraInfoList(infoArr);

        }
    }, [currentClickedCourse])


    const renderExtraInfo = (endIndex = 100) => {
        const shrunkInfoList = extraInfoList.slice(0, endIndex);
        return shrunkInfoList.map((info, index) => (

            <AdditionalInfoBox key={index}>
                <InfoLabel>{info.label}:</InfoLabel>
                {
                    info.field in currentClickedCourse && info.field === "prevQuarters" ?
                        (
                            <PreviouslyOfferedBox>
                                {currentClickedCourse[info.field].map(quarter => (
                                    <PreviousQuarter term={quarter.split(' ')[1]}>
                                        {quarter}
                                    </PreviousQuarter>
                                ))}
                            </PreviouslyOfferedBox>
                        )
                        :
                        (
                            <AdditionalInfoText>
                                {currentClickedCourse[info.field]}
                            </AdditionalInfoText>
                        )
                }
            </AdditionalInfoBox >


        ))
    }

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
                                <span>
                                    {currentClickedCourse.title}
                                </span>

                            </TitleBox>
                            {
                                isExpanded ?
                                    (
                                        <>
                                            {renderExtraInfo()}
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            {renderExtraInfo(3)}
                                        </>
                                    )
                            }
                            {
                                isLong ?
                                    (
                                        <ExpandToggleButtonBox>

                                            {
                                                isExpanded ?
                                                    (
                                                        <ExpandToggleButton onClick={() => setIsExpanded(false)}>
                                                            <FontAwesomeIcon icon={faArrowUp} />
                                                            <ExpandToggleButtonText>
                                                                Less...
                                                            </ExpandToggleButtonText>
                                                        </ExpandToggleButton>
                                                    )
                                                    :
                                                    (
                                                        <ExpandToggleButton onClick={() => setIsExpanded(true)}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                            <ExpandToggleButtonText>
                                                                More...
                                                            </ExpandToggleButtonText>
                                                        </ExpandToggleButton>
                                                    )
                                            }


                                        </ExpandToggleButtonBox>
                                    )
                                    : undefined
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