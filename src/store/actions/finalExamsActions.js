import axios from 'axios';

export const FETCH_FINAL_EXAMS = 'fetch_final_exams';

const ROOT = 'https://mejorado.herokuapp.com'

export function fetchFinalExams(exam_id,quantity) {
    var path = '/exams/' + exam_id + "/gen/" + quantity;
    const request = axios.get(`${ROOT}` + path);
    return {
        type: FETCH_FINAL_EXAMS,
        payload: request
    };
}
