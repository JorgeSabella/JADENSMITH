import _ from 'lodash';
import {
    FETCH_EXAMINFO
} from '../actions/examInfoActions';

export default function(state = {}, action) {
    switch (action.type) {
      case FETCH_EXAMINFO:
          console.log("si funciona fetch_final_exams");
          return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}
