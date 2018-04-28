
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
  } from 'react-native';

  import { connect } from 'react-redux';

 /*  import {LoginComp} from '../components/Login'
 */
  class LoginWrapper extends Component {
      render(){
          return (
            <View><Text>LOGIN</Text></View>
          );
      }
  }

  const mapStateToProps = (state) => {
    return{
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
    };
  }
  
  const Login = connect(mapStateToProps, mapDispatchToProps)(
    LoginWrapper
  );
  
  export default Login;