import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

//import move from './Object';

import Svg,{
    Rect,
} from 'react-native-svg';

export class Rectangle extends Component{
    render(){
        return(
            <Svg 
                style= {{
                    position: 'absolute',
                    top:this.props.top,
                    left:this.props.left,
                }}
                width={this.props.width}
                height={this.props.height}
            >
            <Rect
                x="0"
                y="0"
                width={this.props.width}
                height={this.props.height}
                fill="rgb(0,0,255)"
                strokeWidth="3"
                stroke="rgb(0,0,0)"
            />
            </Svg>
        );
    }
}