import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

export class Triangle extends Component{
    render(){
        return(
            <Svg
                height="100"
                width="100"
            >
                <Polygon
                    points="40,5 70,80 25,95"
                    fill="lime"
                    stroke="purple"
                    strokeWidth="1"
                />
            </Svg>
        );
    }
}

const styles = StyleSheet.create({
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 100,
        borderTopWidth: 100,
        borderRightColor: 'transparent',
        borderTopColor: 'red'
      },
})