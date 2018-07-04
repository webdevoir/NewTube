import {connect} from 'react-redux';
import { requestSingleVideo, requestAllVideos  } from '../../actions/video_actions';
import { createComment, requestAllComments  } from '../../actions/comment_actions';
import { requestAllUsers  } from '../../actions/user_actions';
import { selectAllVideos, selectAllComments  } from '../../reducers/selectors';
import CommentsIndex from './comments_index';

const msp = (state, ownProps) => {
  return({
    comments: selectAllComments(state),
    currentUser: state.entities.users[state.session.id]
  })
};

const mdp = dispatch => {
  return({
    createComment: (comment) => dispatch(createComment(comment)),
    requestAllComments: (id) => dispatch(requestAllComments(id))
  })
};

export default connect(msp, mdp)(CommentsIndex);
