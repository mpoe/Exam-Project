import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import Svg,{
    Polygon,
} from 'react-native-svg';

var {height, width} = Dimensions.get('window');

export class Triangle extends Component{
    
    render(){
        console.log(height);
        console.log(width);
        return(
            <Svg
                style= {{
                    position: 'absolute',
                    top:this.height,
                    left:50
                }}
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

/* const styles = StyleSheet.create({
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
*/