import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-f4468.firebaseio.com/'
})

export default instance;
