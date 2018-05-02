
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    ScrollView,
    Dimensions
  } from 'react-native';

  import { connect } from 'react-redux';

 /*  import {LoginComp} from '../components/Login'
 */
  class LoginWrapper extends Component {
    render(){
      console.log(Dimensions.get('screen').width)
      console.log(Dimensions.get('screen').height)
      return (
        <ScrollView>
          <Image style={{flex:1, resizeMode:'cover', maxWidth:'100%', justifyContent:'flex-start'}} source={require('../Media/portrait2.jpg')}/>
        </ScrollView>
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })