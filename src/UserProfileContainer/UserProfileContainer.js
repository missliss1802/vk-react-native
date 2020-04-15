import {connect} from 'react-redux';
import Userprofile from './../Userprofile/Userprofile';
import {setUserInfoAC} from './../redux/userInfoReducer'
import {setFriendsAC} from './../redux/friendsReducer'

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    setUserInfo: (user_info) => {
    	dispatch(setUserInfoAC(user_info));
    },
    setFriends: (friends) => {
    	dispatch(setFriendsAC(friends));
    }
  }
}


const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Userprofile);

export default UserProfileContainer;