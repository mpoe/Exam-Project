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

import {Triangle} from './Triangle';
import {Rectangle} from './Rectangle';

import Svg from 'react-native-svg';


import {Player} from './Player';
import PlayerController from './PlayerController';

import { player } from '../redux/reducers/player';

class GameWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      move: 0,
      animatedValue: new Animated.Value(0)
    }
    /*
    var move = setInterval(() => {
      this.setState( 
        {
          move: this.state.move+5,
          playerPosition: this.props.playerPostion
        }
      );
    },30);
    */
  }

  animate = (from, to) => {
    console.log("Called")
    console.log(from,to)
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
        {/*shapes*/}
        <Animated.Image style={{position: 'absolute', opacity: this.animate(0,1)}} source={require('../Media/YAMERO.jpg')}  />
        <Player position = {this.state.playerPosition} />
        <PlayerController />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { playerPostion: state.player.position};
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
