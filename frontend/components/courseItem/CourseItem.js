import {
    CourseItemContainer,
    DeptText,
    NumText,
} from './styled'

export const CourseItem = (props) => {
    return (
        <>
            <CourseItemContainer searchList={props.searchList}>
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

