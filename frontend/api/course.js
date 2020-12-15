import axios from 'axios';


const baseDevURL = 'https://localhost:5000/api/course/';
const baseURL = 'https://anteater-pathway.herokuapp.com/api/course/'

const base = axios.create({
    baseURL,
})

export const fetchCourses = async (dept, level, num) => {
    const params = {
        dept, level, num
    }
    
    try{
        let courses = [];
        const response = await base.get('search', { params });
        courses = response.data;
        return courses;
    } catch (e) {
        console.error(e.toString());
        return [];
    }
};