import axios from 'axios';

export const FETCH_EXAMINFO = 'fetch_examinfo';

const ROOT = 'https://mejorado.herokuapp.com'

export function fetchExamInfo(exam_id) {
    var path = '/exams/' + exam_id + "/gen/1";
    const request = axios.get(`${ROOT}` + path);
    return {
        type: FETCH_EXAMINFO,
        payload: request
    };
}
