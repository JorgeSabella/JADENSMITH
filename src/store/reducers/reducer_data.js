import { 
    EXAM_DATA, 
    QUESTION_DATA 
} from '../actions/dataActions';

export default function(state = {}, action) {
    switch (action.type) {
        case QUESTION_DATA:
            return action.payload;
        case EXAM_DATA:
            return action.payload;
        default:
            return state;
    }
}