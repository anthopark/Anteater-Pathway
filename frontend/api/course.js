import axios from 'axios';

const baseURL = 'https://anteater-pathway.herokuapp.com/api/course/'

const base = axios.create({
    baseURL
})

export default base;