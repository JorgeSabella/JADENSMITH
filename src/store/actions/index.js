import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';

const ROOT_URL = 'https://jsonplaceholder.typicode.com'
const ROOT = 'https://mejorado.herokuapp.com'

export function fetchPosts() {
    const request = axios.get(`${ROOT}/subjects`);
    return {
        type: FETCH_POSTS,
        payload: request
    }
}

export function fetchPreguntas() {
    const request = axios.get(`${ROOT}/questions`);
    return {
        type: FETCH_POSTS,
        payload: request
    }
}

export function createPost(values) {
    const request = axios.post(`${ROOT}/subjects`, values);
    return {
        type: CREATE_POST,
        payload: request
    };
}