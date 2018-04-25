import React, { Component } from 'react';
import Svg,{Circle} from 'react-native-svg';
import {
    View,
    StyleSheet,
    Slider, 
    Dimensions
} from 'react-native';

export class Player extends Component{
    render(){
        return(
            <Svg 
                style= {{
                    position: 'absolute',
                    top:Dimensions.get('window').height-(this.props.size)*3,
                    left:this.props.position,
                }}
                height={this.props.size*2}
                width={this.props.size*2}
            >
                <Circle
                    cx={this.props.size}
                    cy={this.props.size}
                    r={this.props.size}
                    fill="pink"
                />
            </Svg>
        );
    }   
}