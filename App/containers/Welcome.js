import React, { Component } from 'react';

import { connect } from 'react-redux';

import Welcome from '../components/Welcome';

import { login } from '../api/';

import { updateUserInfo } from '../redux/actions';


class WelcomeWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facebookID: "",
            token: "",
            name: "",
        }
    }

    gotoLogin = () => {
        this.props.navigation.navigate('Login')
    }

    gotoRegister = () => {
        this.props.navigation.navigate('Register')
    }

    updateState = (payload) => {
        this.setState({
            facebookID: payload.facebookID,
            token: payload.token,
            name: payload.name,
        })
    }

    login = (payload) => {
        login(payload)
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.status == 200) {
                    updateUserInfo({
                        name: this.state.inputName,
                        token: this.state.token,
                        facebookID: this.state.facebookID,
                    })
                    this.props.navigation.navigate('LevelSelection');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <Welcome
                updateState={this.updateState}
                login={this.login}
                gotoLogin={this.gotoLogin}
                gotoRegister={this.gotoRegister}
            />);
    }
}

const mapStateToProps = (state) => {
    return {
        //playerPosition: state.player.position,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInfo: (payload) => dispatch(updateUserInfo(payload))
    };
}

const WelcomeContainer = connect(mapStateToProps, mapDispatchToProps)(
    WelcomeWrapper
);

export default WelcomeContainer;