import {
    CourseItemContainer,
    DeptText,
    NumText,
} from './styled'

export const CourseItem = (props) => {
    return (
        <>
            <CourseItemContainer>
                <DeptText>
                    {props.dept}
                </DeptText>
                <NumText>
                    {props.num}
                </NumText>
            </CourseItemContainer>
        </>
    );
}

