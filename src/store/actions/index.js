import axios from 'axios';

export const FETCH_SUBJECTS = 'fetch_subjects';
export const FETCH_SUBJECT = 'fetch_subject';
export const CREATE_SUBJECT = 'create_subject';
export const QUESTION_DATA = 'question_data';
export const FETCH_QUESTIONS = 'fetch_questions';
export const CREATE_QUESTION = 'create_question';
export const CREATE_EXAM = "create_exam";
export const UPDATE_EXAM = "update_exam";
export const FETCH_EXAMS = 'fetch_exams';

//const ROOT_URL = 'https://jsonplaceholder.typicode.com'
const ROOT = 'https://mejorado.herokuapp.com'

export function fetchSubject(id) {
    const request = axios.get(`${ROOT}/subjects/${id}`);
    return {
        type: FETCH_SUBJECT,
        payload: request
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

export function createExam(values) {
    const request = axios.post(`${ROOT}/exams`, values);
    return {
        type: CREATE_EXAM,
        payload: request
    };
}

export function updateExam(values, id) {
    const request = axios.put(`${ROOT}/exams/${id}`, values);
    return {
        type: UPDATE_EXAM,
        payload: request
    };
}

// TODO 
// updateQuestion()