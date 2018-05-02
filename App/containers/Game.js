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

import Triangle from '../components/Triangle';
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
      renderedShapes: [],
    }
  }

  componentDidMount(){
    this.setState({
      shapes: [
        <Triangle height={100} width={100} top={-105} left={40} key="1" points="40,5 70,80 25,95" />/* ,
        <Triangle height={100} width={100} top={-110} left={81} key="2" />,
        <Rectangle height={100} width={100} top={-115} left={40} key="3"/>,
        <Triangle height={100} width={100} top={-120} left={40} key="4" />,
        <Triangle height={100} width={100} top={-125} left={81} key="5" />,
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
          move: this.state.move+1,
        }
      );
      this.state.shapes.map((shape, index) => {
        let top = shape.props.top+this.state.move;
        if(top == 0-shape.props.height){
          this.state.renderedShapes.push(shape);
        }
      })
    },100);
  }

  playerGotHit = (source) => {
    console.log("Hit! by")
    console.log(source);
  }

  playerPosition = (value) => {
    this.props.updatePlayerPosition(value);
  };

  goto = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.renderedShapes}
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
