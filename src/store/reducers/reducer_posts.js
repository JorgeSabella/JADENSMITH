import _ from 'lodash';
import { 
    FETCH_SUBJECT,
    FETCH_SUBJECTS, 
    QUESTION_DATA, 
    FETCH_EXAMS,
    FETCH_EXAM,
    FETCH_QUESTIONS
} from '../actions/index';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_SUBJECT:
            return action.payload.data
        case FETCH_SUBJECTS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_EXAM:
            return _.mapKeys(action.payload.data.questions, 'id');
        case FETCH_EXAMS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}