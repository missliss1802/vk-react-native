import {connect} from 'react-redux';
import Friends from './../Friends/Friends';
import {setFriendsAC} from './../redux/friendsReducer';
import {setIdAC} from './../redux/idReducer';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    setFriends: friends => {
      dispatch(setFriendsAC(friends));
    },
    setId: city_id => {
      dispatch(setIdAC(city_id));
    },
  };
};

const FriendsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Friends);

export default FriendsContainer;
