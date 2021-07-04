import {connect} from 'react-redux';
import Login from './../Login/Login';

const mapStateToProps = state => {
  return state;
};

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;
