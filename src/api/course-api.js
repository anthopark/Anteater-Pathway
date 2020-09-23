
import axios from 'axios';

const devBaseURL = 'http://localhost:5000/api'

const base = axios.create({
    baseURL: devBaseURL,
})

export default base;