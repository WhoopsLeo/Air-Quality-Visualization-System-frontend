import axios from 'axios';
let instance = axios.create({
    baseURL: 'http://localhost:9099',
})
export default instance;
