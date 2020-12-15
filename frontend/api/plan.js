import axios from 'axios';

const baseDevURL = 'https://localhost:5000/api/plan/';
const baseURL = 'https://anteater-pathway.herokuapp.com/api/plan/';

const base = axios.create({
    baseURL,
})

export const savePlan = async (userId, degreePlan) => {
    try {
        await base.post('save', { userId, degreePlan });
        return true;
    } catch (e) {
        console.error(e.toString());
        return false;
    }
}

