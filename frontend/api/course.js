import axios from 'axios';

const base = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const fetchCourses = async (dept, level, num) => {
    const params = {
        dept, level, num
    }
    
    try{
        let courses = [];
        const response = await base.get('/course/search', { params });
        courses = response.data;
        return courses;
    } catch (e) {
        console.error(e.toString());
        return [];
    }
};