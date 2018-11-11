import { EXAM_DATA } from '../actions/dataActions';

export default function(state = {}, action) {
    switch (action.type) {
        case EXAM_DATA:
            return action.payload;
        default:
            return state;
    }
}