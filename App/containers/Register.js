import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native'

import { NavigationActions } from 'react-navigation';

import { createProfile } from '../api/'

import { connect } from 'react-redux';

import { updateUserInfo } from '../redux/actions';

class RegisterWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputName: "",
            inputPassword: "",
        }
    }

    signup = (payload) => {
        createProfile(payload)
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON);
                if (responseJSON.status == 200) {
                    updateUserInfo({
                        name: this.state.inputName,
                        token: this.state.token,
                        facebookID: this.state.facebookID,
                    });

                    this.props.navigation.dispatch(
                        NavigationActions.reset({
                            index: 0,
                            key: null,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Game' })
                            ]
                        })
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    render() {
        return (
            <View>
                <TextInput
                    onChangeText={(text) => this.setState({ inputName: text })}
                    value={this.state.inputName}
                />
                <TextInput
                    onChangeText={(text) => this.setState({ inputPassword: text })}
                    secureTextEntry={true}
                    value={this.state.inputPassword}
                />
                <TouchableOpacity
                    onPress={() => this.signup({ name: this.state.inputName, password: this.state.inputPassword })}
                    style={{ backgroundColor: 'grey', alignItems: 'center' }}
                >
                    <Text>Sign up</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInfo: (payload) => dispatch(updateUserInfo(payload))
    };
}

const Register = connect(mapStateToProps, mapDispatchToProps)(
    RegisterWrapper
);

export default Register;