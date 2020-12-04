import axios from 'axios';

const baseURL = 'https://anteater-pathway.herokuapp.com/api/course/'

const base = axios.create({
    baseURL
})

export const fetchCourses = async(dept, level, num) => {
    const params = {
        dept, level, num
    }
    
    try{
        let courses = [];
        const response = await base.get('search', { params });
        courses = response.data;
        return courses;
    } catch (e) {
        console.log(e.toString());
        return 
    }
};