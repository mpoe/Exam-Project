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