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
  TouchableOpacity
} from 'react-native';

import {Triangle} from './Triangle';
import {Rectangle} from './Rectangle';

import Svg from 'react-native-svg';
//import Interaction from './Interaction';

import {Player} from './Player';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      move: 0
    }
    /*
    var move = setInterval(() => {
      this.setState( 
        {move: this.state.move+5}
      );
    },30);
    */
  }
  

  render() {
    let shapes = [
      <Triangle height={100} width={100} top={-200} left={40} move={this.state.move} />,
      <Triangle height={100} width={100} top={-400} left={40} move={this.state.move} />,
      <Rectangle height={100} width={100} top={-600} left={40} move={this.state.move}/>,
    ]
    let shapeList = shapes.map((shape, key) => (
      shape
    ))
    return (
      
      <View style={styles.container}>
        {/*shapeList*/}
        <Player/>
      </View>
      
    );
  }
}

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
