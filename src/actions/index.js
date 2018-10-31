import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';

const ROOT_URL = 'https://jsonplaceholder.typicode.com'
const ROOT = 'http://10.12.60.38:3000'

export function fetchPosts() {
    const request = axios.get(`${ROOT}/subjects`);
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