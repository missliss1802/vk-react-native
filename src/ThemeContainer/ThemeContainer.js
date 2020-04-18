import {connect} from 'react-redux';
import Theme from './../Theme/Theme';
import {setThemeAC} from '../redux/themeReducer.js'

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    setTheme: (theme) => {
    	dispatch(setThemeAC(theme));
    }
  }
}


const ThemeContainer = connect(mapStateToProps, mapDispatchToProps)(Theme);

export default ThemeContainer;