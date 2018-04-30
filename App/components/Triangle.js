import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    Text
} from 'react-native';

import Svg,{
    Polygon,
} from 'react-native-svg';

var {height, width} = Dimensions.get('window');

export class Triangle extends Component{
    constructor(props){
        super(props)
        this.dropValue=new Animated.Value(0);
      }
  
      componentDidMount () {
        this.drop()
        console.log("CDM")
      }
      drop () {
          console.log("Drop called on")
          console.log(this)
        this.dropValue.setValue(0)
        Animated.timing(
          this.dropValue,
          {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear
          }
        ).start(/* () => this.drop() */)
      }
    render(){
        const drop = this.dropValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Dimensions.get('window').height+this.props.height*2]
          })
        return(
            <Animated.View 
                style= {{
                    transform: [{translateY: drop}],
                    top:this.props.top,
                    left:this.props.left,
                    position: 'absolute',
                }}
            >
               <Svg
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
            </Animated.View>
        );
    }
}