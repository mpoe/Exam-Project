import React, { Component } from 'react';

import {
	Text,
	TouchableOpacity,
} from 'react-native';

export default class LevelSelector extends Component {
	render() {
		return (
			<TouchableOpacity
				style= {{position:'absolute', top:this.props.top, left:this.props.left,}}
				onPress = {() => this.props.gotoLevel()}
			>
				<Text>Level {this.props.levelID}</Text>
			</TouchableOpacity>
		);
	}
}