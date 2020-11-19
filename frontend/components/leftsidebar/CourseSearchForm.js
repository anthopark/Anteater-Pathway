import {
    Dropdown,
} from '../utils';


import {
    SearchFormContainer,
    SearchForm,
    FormFieldBox,
    FormLabel,
    FormTextInput,
    ThreeColumnGridBox,
    SearchButton,

} from './styled';




const CourseSearchForm = () => {
    return (

        <SearchFormContainer>
            <SearchForm>
                <FormFieldBox>
                    <FormLabel>Department</FormLabel>
                    <Dropdown
                        id='1'
                        placeholder='ex. ECON, HIST'

                    />
                </FormFieldBox>
                <FormFieldBox>
                    <FormLabel>Level</FormLabel>
                    <Dropdown
                        id='2'
                        placeholder='ex. Upper Division'
                    />
                </FormFieldBox>
                <FormFieldBox>
                    <FormLabel>Number</FormLabel>
                    <ThreeColumnGridBox>
                        <FormTextInput type='text' placeholder='ex. 1A, 122B' />
                        <div></div>
                        <SearchButton
                            type='submit'
                        >
                            Zot!
                        </SearchButton>
                    </ThreeColumnGridBox>
                </FormFieldBox>
            </SearchForm>
        </SearchFormContainer>

    );
}

export default CourseSearchForm;
