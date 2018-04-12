import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import Svg,{
    Rect,
} from 'react-native-svg';

export class Rectangle extends Component{
    render(){
        return(
            <Svg
                height="100"
                width="100"
            >
                <Rect
                    x="25"
                    y="5"
                    width="150"
                    height="50"
                    fill="rgb(0,0,255)"
                    strokeWidth="3"
                    stroke="rgb(0,0,0)"
                />
            </Svg>
        );
    }
}