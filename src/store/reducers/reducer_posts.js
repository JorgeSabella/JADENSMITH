import _ from 'lodash';
import { FETCH_POSTS, QUESTION_DATA } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case QUESTION_DATA:
            return action.payload;
        default:
            return state;
    }
}