import React, { Component } from 'react';
import Svg,{Circle} from 'react-native-svg';
import {
    View,
    StyleSheet,
    Slider, 
    Dimensions
} from 'react-native';

export class Player extends Component{
    constructor(props){
        super(props);
        this.state= {
            health: 1,
            score: 0,
            size: 25,
        }
    }

    move = (value) => {

    };
    render(){
        return(
            <Svg 
                style= {{
                    position: 'absolute',
                    top:Dimensions.get('window').height-(this.state.size)*3,
                    left:this.props.position,
                }}
                height={this.state.size*2}
                width={this.state.size*2}
            >
                <Circle
                    cx={this.state.size}
                    cy={this.state.size}
                    r={this.state.size}
                    fill="pink"
                />
            </Svg>
        );
    }   
}