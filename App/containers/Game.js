/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

import Svg from 'react-native-svg';


import {Player} from '../components/Player';
import {PlayerController} from '../components/PlayerController';

import { player } from '../redux/reducers/player';

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
    
    let move = setInterval(() => {
      this.setState( 
        {
          move: this.state.move+5,
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

  render() {
    /*
    let shapes = [
      <Triangle height={100} width={100} top={200+this.state.move} left={40} key="1" />,
      <Triangle height={100} width={100} top={-400+this.state.move} left={40} key="2" />,
      <Rectangle height={100} width={100} top={-600+this.state.move} left={40} key="3"/>,
    ]
    
    shapes.map((shape, index) => {
      if(shape.props.top >Dimensions.get('screen').height){
        shapes.splice(index,1)
      }
      if(shape.props.top < 0-shape.props.height){
        shapes.splice(index,1)
      }
    });
    console.log(shapes.length);
    */
    return (
      <View style={styles.container}>
        {/* shapes */}
        {/*<Animated.Image style={{position: 'absolute', opacity: this.animate(1,0)}} source={require('../Media/YAMERO.jpg')}  />*/}
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
    //payload = position
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
