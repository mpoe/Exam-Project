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

import { login } from '../api/'

import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

import { updateUserInfo } from '../redux/actions';

/*  import {LoginComp} from '../components/Login'
*/
class LoginWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputName: "",
			inputPassword: "",
		}
	}

	login = (payload) => {
		console.log(payload)
		login(payload)
			.then((response) => response.json())
			.then((responseJSON) => {
				console.log(responseJSON);
				if (responseJSON.status == 200) {
					updateUserInfo({
						name: this.state.inputName,
						password: this.state.inputPassword,
						token: this.state.token,
						facebookID: this.state.facebookID,
					})
					this.props.navigation.dispatch(
                        NavigationActions.reset({
                            index: 0,
                            key: null,
                            actions: [
                                NavigationActions.navigate({ routeName: 'LevelSelection' })
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
					onPress={() => this.login({ name: this.state.inputName, password: this.state.inputPassword })}
					style={{ backgroundColor: 'grey', alignItems: 'center' }}
				>
					<Text>Log In</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		name: state.user.name
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
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