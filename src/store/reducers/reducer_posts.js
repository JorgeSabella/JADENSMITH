import _ from 'lodash';
import { 
    FETCH_SUBJECTS, 
    QUESTION_DATA, 
    FETCH_EXAMS,
    FETCH_QUESTIONS
} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_SUBJECTS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_EXAMS:
            return _.mapKeys(action.payload.data, 'id');
        case QUESTION_DATA:
            return action.payload;
        default:
            return state;
    }
}