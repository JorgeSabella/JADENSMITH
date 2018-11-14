import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import DataReducer from './reducer_data';
import FinalExamsReducer from './reducer_finalExams'
import ExamInfoReducer from './reducer_examInfo'

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer,
  data: DataReducer,
  finalExams: FinalExamsReducer,
  examInfo: ExamInfoReducer
});

export default rootReducer;
