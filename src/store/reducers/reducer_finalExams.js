import _ from 'lodash';
import {
    FETCH_FINAL_EXAMS
} from '../actions/finalExamsActions';

export default function(state = {}, action) {
    switch (action.type) {
      case FETCH_FINAL_EXAMS:
          console.log("si funciona fetch_final_exams");
          return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}
