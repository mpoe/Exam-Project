
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
    Dimensions,
    TextInput
} from 'react-native';

import {createProfile, login} from '../api/'

import { connect } from 'react-redux';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import { updateUserInfo } from '../redux/actions';

 /*  import {LoginComp} from '../components/Login'
 */
class LoginWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputName:"",
      inputPassword:"",
      facebookID:"",
      token:"",
    }
  }

  signup = (payload) => {
    createProfile(payload)
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      if(responseJSON.status==200){
        updateUserInfo({
          name: this.state.inputName,
          password: this.state.inputPassword,
          token: this.state.token,
          facebookID: this.state.facebookID,
        })
        this.props.navigation.navigate('Game');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  login = (payload) => {
    login(payload)
    .then((response) => response.json())
    .then((responseJSON) => {
      if(responseJSON.status==200){
        updateUserInfo({
          name: this.state.inputName,
          password: this.state.inputPassword,
          token: this.state.token,
          facebookID: this.state.facebookID,
        })
        this.props.navigation.navigate('Game');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){
    console.log(this.state);
    return (
      <View>
        <TextInput
          onChangeText={(text) => this.setState({inputName:text})}
          value={this.state.inputName}
        />
        <TextInput
          onChangeText={(text) => this.setState({inputPassword:text})}
          secureTextEntry={true}
          value={this.state.inputPassword}
        />
        <TouchableOpacity
          onPress={() => this.signup({name:this.state.inputName, password:this.state.inputPassword})}
          style={{backgroundColor:'grey', alignItems:'center'}}
        > 
          <Text>Sign In</Text>
        </TouchableOpacity>
        <FBLogin
          buttonView={<Text>Login with fb </Text>}
          ref={(fbLogin) => { this.fbLogin = fbLogin }}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          permissions={["email"]}
          onLogin={(e) => {
            console.log(e)
            this.setState({facebookID:e.credentials.userId, token:e.credentials.token, name: e.profile.first_name})
            this.login({facebookID:e.credentials.userId, token:e.credentials.token, name:e.profile.first_name})
          }}
          onLoginFound={(e) => {
            console.log(e);
            this.setState({facebookID:e.credentials.userId, token:e.credentials.token})
            this.login({facebookID:e.credentials.userId, token:e.credentials.token})
          }}
          onLoginNotFound={function(e){console.log(e)}}
          onLogout={function(e){console.log(e)}}
          onCancel={function(e){console.log(e)}}
          onPermissionsMissing={function(e){console.log(e)}}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    name: state.user.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    updateUserInfo: (payload) => dispatch(updateUserInfo(payload))
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