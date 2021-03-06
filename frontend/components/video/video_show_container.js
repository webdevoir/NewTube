import {connect} from 'react-redux';
import { requestSingleVideo,
  requestAllVideos,
  vPlaying,
createLike, updateLike, deleteLike, createView,editVideo  } from '../../actions/video_actions';
import { createComment, requestAllComments  } from '../../actions/comment_actions';
import { requestAllUsers, createSub, deleteSub  } from '../../actions/user_actions';
import { selectAllVideos  } from '../../reducers/selectors';
import { recordView  } from '../../actions/view_actions';
import VideoShow from './video_show';

const msp = (state, ownProps) => {
  return({
    videos: selectAllVideos(state),
    videoHash: state.entities.videos,
    users: state.entities.users,
    video: state.entities.videos[ownProps.match.params.id],
    comments: state.entities.comments,
    vidPlaying: state.ui.vidPlaying.vidPlaying,
    currentUser: state.entities.users[state.session.id],
    button: state.ui.watchLaterBttn,
    nightMode: state.session.night_mode,
    autoplay: state.session.autoplay,
    videoQueue: state.ui.vidPlaying.videoQueue
  })
};

const mdp = dispatch => {
  return({
    requestSingleVideo: (id) => dispatch(requestSingleVideo(id)),
    requestAllVideos: () => dispatch(requestAllVideos()),
    requestAllUsers: () => dispatch(requestAllUsers()),
    createComment: (comment) => dispatch(createComment(comment)),
    requestAllComments: (id) => dispatch(requestAllComments(id)),
    vPlaying: (bool) => dispatch(vPlaying(bool)),
    createLike: (videoId, like) => dispatch(createLike(videoId, like)),
    updateLike: (videoId, userId, like) => dispatch(updateLike(videoId, userId, like)),
    deleteLike: (id) => dispatch(deleteLike(id)),
    createView: (videoId) => dispatch(createView(videoId)),
    createSub: (subscribeeId) => dispatch(createSub(subscribeeId)),
    deleteSub: (subscribeeId) => dispatch(deleteSub(subscribeeId)),
    editVideo: (videoId, data) => dispatch(editVideo(videoId, data)),
    recordView: (videoId) => dispatch(recordView(videoId)),
  })
};

export default connect(msp, mdp)(VideoShow);
