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
  Image
} from 'react-native';

import { connect } from 'react-redux';

import {Triangle} from '../components/Triangle';
import {Rectangle} from '../components/Rectangle';

import {Player} from '../components/Player';
import {PlayerController} from '../components/PlayerController';

import { updatePlayerPosition } from '../redux/actions';

class GameWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      move: 0,
      animatedValue: new Animated.Value(0),
      playerHealth: 1,
      playerSize: 25,
      score: 0,
      screenWidth: Dimensions.get('window').width,
    }
  }

  componentDidMount(){
    let move = setInterval(() => {
      this.setState( 
        {
          move: this.state.move+3,
          playerPosition: this.props.playerPostion
        }
      );
    },30);
  }

  playerPosition = (value) => {
    this.props.updatePlayerPosition(value);
  };

  animate = (from, to) => {
    this.state.animatedValue.setValue(from)
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: to,
        duration: 500
      }
    ).start(() => console.log("done"));
  }

  goto = () => {
    console.log("Called")
    this.props.navigation.navigate('Login');
  }

  stopGame = () => {
    
  }

  render() {
    let shapes = [
      <Triangle height={100} width={100} top={200+this.state.move} left={40} key="1" />,
      <Triangle height={100} width={100} top={-400+this.state.move} left={81} key="2" />,
      <Rectangle height={100} width={100} top={-600+this.state.move} left={40} key="3"/>,
      <Triangle height={100} width={100} top={-1200+this.state.move} left={40} key="4" />,
      <Triangle height={100} width={100} top={-1400+this.state.move} left={81} key="5" />,
      <Rectangle height={100} width={100} top={-1600+this.state.move} left={40} key="6"/>,
      <Triangle height={100} width={100} top={-5200+this.state.move} left={40} key="7" />,
      <Triangle height={100} width={100} top={-5400+this.state.move} left={81} key="8" />,
      <Rectangle height={100} width={100} top={-5600+this.state.move} left={40} key="9"/>,
      <Triangle height={100} width={100} top={-2200+this.state.move} left={40} key="10" />,
      <Triangle height={100} width={100} top={-2400+this.state.move} left={81} key="12" />,
      <Rectangle height={100} width={100} top={-2600+this.state.move} left={40} key="13"/>,
      <Triangle height={100} width={100} top={-3200+this.state.move} left={40} key="11" />,
      <Triangle height={100} width={100} top={-3400+this.state.move} left={81} key="112" />,
      <Rectangle height={100} width={100} top={-3600+this.state.move} left={40} key="113"/>,
      <Triangle height={100} width={100} top={-4200+this.state.move} left={40} key="111" />,
      <Triangle height={100} width={100} top={-4400+this.state.move} left={81} key="1112" />,
      <Rectangle height={100} width={100} top={-4600+this.state.move} left={40} key="11113"/>,
    ]
    return (
      <View style={styles.container}>
        {shapes}
        {/* <Animated.Image style={{position: 'absolute', opacity: this.animate(1,0)}} source={require('../Media/YAMERO.jpg')}/> */}
        <TouchableOpacity 
          style={{
            width:'100%',
            height:50,
          }}
          onPress = {this.stopGame}
        >
          <View><Text>ASD</Text></View>
        </TouchableOpacity>
        <Player position = {this.props.playerPosition} size={this.state.playerSize} />
        <PlayerController playerPosition ={this.playerPosition} maxValue={this.state.playerSize*2} screenWidth={this.state.screenWidth} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { playerPosition: state.player.position};
};

const mapDispatchToProps = (dispatch) => {
  return{
    //payload is the position of the player
    updatePlayerPosition: (payload) => dispatch(updatePlayerPosition(payload))
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
    width:'100%',
    height:'100%',
  },
});
