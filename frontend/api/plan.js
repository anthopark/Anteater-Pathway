import axios from 'axios';

const baseURL = 'https://anteater-pathway.herokuapp.com/api/plan/'

const base = axios.create({
    baseURL
})

export default base;