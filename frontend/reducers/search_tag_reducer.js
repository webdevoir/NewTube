import { RECEIVE_SEARCH } from '../actions/search_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SEARCH:
      return action.tags || [];
    default:
      return state;
  }
};
