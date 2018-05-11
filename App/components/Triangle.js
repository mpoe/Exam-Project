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

import { connect } from 'react-redux';

var {height, width} = Dimensions.get('window');

class TriangleWrapper extends Component{
    
    constructor(props){
        super(props)
        this.dropValue=new Animated.Value(0);
        this.dropValue.addListener(({value}) => {
            console.log(value) //Assumed Y value
            this.checkCollision(value);
            console.log(this)
        })
    }
  
    componentDidMount () {
        this.drop()
    }

    checkCollision = (value) => {
        let points = this.props.points.replace(/,/g , ".");
        points = this.props.points.split(/[\s]/)
        console.log(points)
        let triangleCoordinates = {
            x1: this.props.left+points[0],
            y1: value+points[1],
            x2: this.props.left+points[2],
            y2: value+points[3],
            x3: this.props.left+points[4],
            y3: value+points[5],
        }
        console.log(triangleCoordinates);
        let playerCoordinates = {
            x:this.props.playerPosition
        }
        console.log(playerCoordinates)
    }

    drop () {
        this.dropValue.setValue(0)
        Animated.timing(
            this.dropValue,
            {
                //toValue was 1
                toValue: Dimensions.get('window').height+this.props.height*2,
                duration: 10000,
                easing: Easing.linear
            }
        ).start(() => {
            this.dropValue.removeListener
        })
    }
    render(){
        const drop = this.dropValue.interpolate({
            //was [0,1]
            inputRange: [0, Dimensions.get('window').height+this.props.height*2],
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
                        points={this.props.points}
                        fill="lime"
                        stroke="purple"
                        strokeWidth="1"
                    />
                </Svg>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state) => {
    return { playerPosition: state.player.position};
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
    };
  }
  
  const Triangle = connect(mapStateToProps, mapDispatchToProps)(
    TriangleWrapper
  );
  
  export default Triangle;