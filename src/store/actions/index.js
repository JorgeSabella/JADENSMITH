import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const QUESTION_DATA = 'question_data';

const ROOT_URL = 'https://jsonplaceholder.typicode.com'
const ROOT = 'https://mejorado.herokuapp.com'

export function questionData(param) {
    console.log("action",param)
    return {
        type: QUESTION_DATA,
        payload: param
    }
}

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

// export function createExam(state, values) {
//     values = Object.assign({subject_id: "ddb19e1b-5fb9-408b-83dc-cf3b7dd701f2"}, values);
//     state.exam = values;
//     state = JSON.stringify(state);
//     console.log(state);
//     const request = axios.get(`${ROOT}/exams/${5}`, state);
//     return {
//         type: CREATE_POST,
//         payload: request
//     };
// }
