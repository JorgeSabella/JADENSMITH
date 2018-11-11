export const EXAM_DATA = 'exam_data';
export const QUESTION_DATA = 'question_data';

export function sendExamData(data) {
    return {
        type: EXAM_DATA,
        payload: data
    }
}

export function sendQuestionData(data) {
    return {
        type: QUESTION_DATA,
        payload: data
    }
}