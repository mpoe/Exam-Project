import React, { Component } from 'react';
import {
    Slider
} from 'react-native';


export class PlayerController extends Component{
    render(){
        return (
            <Slider 
                onValueChange = { value => this.props.playerPosition(value)} 
                style= {{
                    width:'100%',
                }}
                minimumValue={0}
                maximumValue={this.props.screenWidth - this.props.maxValue}
            />
        );
    };
}