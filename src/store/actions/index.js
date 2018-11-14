import axios from 'axios';

export const FETCH_SUBJECTS = 'fetch_subjects';
export const CREATE_SUBJECT = 'create_subject';
export const QUESTION_DATA = 'question_data';
export const FETCH_QUESTIONS = 'fetch_questions';
export const CREATE_QUESTION = 'create_question';
export const FETCH_EXAMS = 'fetch_exams';
export const EXAM_DATA = 'exam_data';

//const ROOT_URL = 'https://jsonplaceholder.typicode.com'
//const ROOT = 'https://raw.githubusercontent.com/acevedodavid/fakeJson/master/'
const ROOT = 'https://mejorado.herokuapp.com'

export function questionData(param) {
    return {
        type: QUESTION_DATA,
        payload: param
    }
}

export function fetchSubjects() {
    const request = axios.get(`${ROOT}/subjects`);
    return {
        type: FETCH_SUBJECTS,
        payload: request
    }
}

export function createSubject(values) {
    const request = axios.post(`${ROOT}/subjects`, values);
    return {
        type: CREATE_SUBJECT,
        payload: request
    };
}

export function fetchQuestions() {
    const request = axios.get(`${ROOT}/questions`);
    return {
        type: FETCH_QUESTIONS,
        payload: request
    }
}

export function createQuestion(values) {
    const request = axios.post(`${ROOT}/questions`, values);
    return {
        type: CREATE_QUESTION,
        payload: request
    }
}

export function fetchExams() {
    const request = axios.get(`${ROOT}/exams`);
    return {
        type: FETCH_EXAMS,
        payload: request
    };
}

export function examData(exam_id, quantity) {
    var path = 'exams/' + exam_id + "/gen/" + quantity;
    //var path = 'mock.json'
    const request = axios.get(`${ROOT}/` + path);
    return {
        type: EXAM_DATA,
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


// TODO
// updateExam()

// TODO
// updateQuestion()
