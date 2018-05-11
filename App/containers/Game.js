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
import {Rectangle} from '../components/Rectangle';

import {Player} from '../components/Player';
import {PlayerController} from '../components/PlayerController';

import { updatePlayerPosition } from '../redux/actions';

import {getTopscores} from '../api/'

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
      modalVisible: false,
      topScores:[],
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount(){
    this.setState({
      shapes: [
        <Triangle height={100} width={100} top={-105} left={40} key="1" points="40,5 70,80 25,95" /> /*,
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

  getTopscores = (payload) =>{
    getTopscores(payload)
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      if(responseJSON.status==200){
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
        
        <View style={{marginTop: 22}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Hello World!</Text>
                <ScrollView
                  style={{height:200}}
                >
                  {this.state.topScores.map((result) => {
                    return <Text>{result.score}</Text>
                  })}
                </ScrollView>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.getTopscores({levelID:1});
            }}>
            <Text>Show Modal</Text>
          </TouchableOpacity>
        </View>

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
