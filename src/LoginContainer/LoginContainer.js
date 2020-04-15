import {connect} from 'react-redux';
import Login from './../Login/Login';
import {setTokenAC} from './../redux/tokenReducer'

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
    	dispatch(setTokenAC(token));
    }
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;