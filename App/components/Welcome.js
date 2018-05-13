import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
} from 'react-native';

import Splitter from './common/Splitter'
import FacebookLogin from './common/FacebookLogin';

export default class Welcome extends React.Component {
	render() {
		return (
			<View>
				<TouchableOpacity
					onPress={() => this.props.gotoLogin()}
				>
					<Text>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.props.gotoRegister()}
				>
					<Text>Sign up</Text>
				</TouchableOpacity>
				<Splitter />
				<Text>Or</Text>
				<FacebookLogin updateState={this.props.updateState} login={this.props.login} />
			</View>
		);
	}
}