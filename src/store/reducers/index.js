import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import DataReducer from './reducer_data';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer,
  data: DataReducer
});

export default rootReducer;
