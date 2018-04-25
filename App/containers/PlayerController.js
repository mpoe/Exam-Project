import React, { Component } from 'react';
import {
    Slider,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';

import { updatePlayerPosition } from '../redux/actions';

class PlayerControllerWrapper extends Component{
    playerPosition = (value) => {
        this.props.updatePlayerPosition(value);
    };

    render(){
        screenWidth = Dimensions.get('window').width;
        return (
            <Slider 
                onValueChange = { value => this.playerPosition(value)} 
                style= {{
                    width:'100%',
                }}
                minimumValue={0}
                //Playersize = 25, *2
                maximumValue={screenWidth-50}
            />
        );
    };
}
//Get store to state
const mapStateToProps = (state) => {
    return { store: state};
  };
//Get functions from redux to container
const mapDispatchToProps = (dispatch) => {
    return{
      //payload = position
      updatePlayerPosition: (payload) => dispatch(updatePlayerPosition(payload))
    };
  }
  
  const PlayerController = connect(mapStateToProps, mapDispatchToProps)(
    PlayerControllerWrapper
  );
  
export default PlayerController;