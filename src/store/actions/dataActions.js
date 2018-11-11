export const EXAM_DATA = 'exam_data';

export function sendExamData(data) {
    return {
        type: EXAM_DATA,
        payload: data
    }
}