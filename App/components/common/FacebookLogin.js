import React, { Component } from 'react';
import { Text } from 'react-native';

import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

export default class FacebookLogin extends React.Component {
    render() {
        return (
            <FBLogin
                buttonView={<Text>Login with fb </Text>}
                ref={(fbLogin) => { this.fbLogin = fbLogin }}
                loginBehavior={FBLoginManager.LoginBehaviors.Native}
                permissions={["email"]}
                onLogin={(e) => {
                    console.log(e)
                    this.props.updateState({ facebookID: e.credentials.userId, token: e.credentials.token })
                    this.props.login({ facebookID: e.credentials.userId, token: e.credentials.token })
                }}
                onLoginFound={(e) => {
                    console.log(e);
                    this.props.updateState({ facebookID: e.credentials.userId, token: e.credentials.token })
                    this.props.login({ facebookID: e.credentials.userId, token: e.credentials.token })
                }}
                onLoginNotFound={function (e) { console.log(e) }}
                onLogout={function (e) { console.log(e) }}
                onCancel={function (e) { console.log(e) }}
                onPermissionsMissing={function (e) { console.log(e) }}
            />
        )
    }
}