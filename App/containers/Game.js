import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Easing,
	Animated,
	Dimensions,
	Image,
	Modal,
	ScrollView,
} from 'react-native';

import { connect } from 'react-redux';

import Triangle from '../components/Triangle';
import Rectangle from '../components/Rectangle';
import Coin from '../components/Coin';

import { Player } from '../components/Player';
import { PlayerController } from '../components/PlayerController';

import { updatePlayerPosition, updatePlayerInvulnerability } from '../redux/actions';

import { getTopscores } from '../api/'

import { playerSize, playerTop, invulnerabilityTime } from '../constants/'

class GameWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			move: 0,
			playerHealth: 3,
			playerSize: playerSize,
			score: 0,
			screenWidth: Dimensions.get('window').width,
			renderedShapes: [],
			modalVisible: false,
			topScores: [],
		}
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	componentDidMount() {
		this.setState({
			shapes: [
				//Triangles height and width = to the highest value of the points prop, can be extracted in the future?
				<Triangle height={95} width={70} delay={1} left={40} key="1" points="40,5 70,80 25,95" playerGotHit={this.playerGotHit}/> ,
				<Rectangle height={100} width={100} delay={5} left={140} key="3" playerGotHit={this.playerGotHit}/>,
				<Triangle height={100} width={100} delay={10} left={81} key="4" points="0,5 50,80 25,100" playerGotHit={this.playerGotHit}/>, ,
				<Triangle height={100} width={100} delay={15} left={81} key="2" points="40,5 70,80 25,95" playerGotHit={this.playerGotHit}/> ,
				<Rectangle height={200} width={200} delay={25} left={40} key="5" playerGotHit={this.playerGotHit}/>,
				<Coin size={10} delay={1} left ={0} key="193" pickUpCoin={this.pickUpCoin} />/*,
				<Rectangle height={100} width={100} top={-130} left={40} key="6"/>,
				<Triangle height={100} width={100} top={-140} left={40} key="7" />,
				<Triangle height={100} width={100} top={-140} left={81} key="8" />,
				<Rectangle height={100} width={100} top={-135} left={40} key="9"/>,
				<Triangle height={100} width={100} top={-145} left={40} key="10" />,
				<Triangle height={100} width={100} top={-145} left={81} key="12" />,
				<Rectangle height={100} width={100} top={-2600} left={40} key="13"/>,
				<Triangle height={100} width={100} top={-3200} left={40} key="11" />,
				<Triangle height={100} width={100} top={-3400} left={81} key="112" />,
				<Rectangle height={100} width={100} top={-3600} left={40} key="113"/>,
				<Triangle height={100} width={100} top={-4200} left={40} key="111" />,
				<Triangle height={100} width={100} top={-4400} left={81} key="1112" />,
				<Rectangle height={100} width={100} top={-4600} left={40} key="11113"/>, */
			]
		})

		let tick = setInterval(() => {
			this.setState(
				{
					move: this.state.move + 1,
					score: this.state.score + 1,
				}
			);
			this.state.shapes.map((shape, index) => {
				let top = shape.props.top + this.state.move;
				if (shape.props.delay == this.state.move) {
					this.state.renderedShapes.push(shape);
				}
			})
		}, 100);
	}

	playerGotHit = (source) => {
		if(!this.props.playerInvulnerability){			
			this.setState({
				playerHealth: this.state.playerHealth - 1,
			})
			this.props.updatePlayerInvulnerability(!this.props.playerInvulnerability)
			setTimeout(() => {
				this.props.updatePlayerInvulnerability(!this.props.playerInvulnerability)
			}, invulnerabilityTime);
		}
	}

	pickUpCoin = () => {
		this.setState({
			score: this.state.score +50,
		})
	}

	playerPosition = (value) => {
		this.props.updatePlayerPosition(value);
	};

	goto = () => {
		this.props.navigation.navigate('Login');
	}

	getTopscores = (payload) => {
		getTopscores(payload)
			.then((response) => response.json())
			.then((responseJSON) => {
				console.log(responseJSON);
				if (responseJSON.status == 200) {
					this.setState({
						topScores: responseJSON.results
					})
					console.log(this.state);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.renderedShapes}
				<Player position={this.props.playerPosition} size={this.state.playerSize} top={playerTop} invulnerable={this.props.playerInvulnerability} />
				<PlayerController playerPosition={this.playerPosition} maxValue={this.state.playerSize * 2} screenWidth={this.state.screenWidth} />
				<Text style={{position:'absolute', left:0, top:0}}>Score: {this.state.score}</Text>
				<Text style={{position:'absolute', right:0, top:0}}>Health: {this.state.playerHealth}</Text>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		playerPosition: state.player.position,
		playerInvulnerability: state.player.invulnerable,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		//payload is the position of the player
		updatePlayerPosition: (payload) => dispatch(updatePlayerPosition(payload)),
		updatePlayerInvulnerability: (payload) => dispatch(updatePlayerInvulnerability(payload)),
	};
}

const Game = connect(mapStateToProps, mapDispatchToProps)(
	GameWrapper
);

export default Game;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
});
