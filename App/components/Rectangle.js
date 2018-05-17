import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';

import Svg,{
    Rect,
} from 'react-native-svg';

import { connect } from 'react-redux';

import { playerSize, playerTop } from '../constants'

export class RectangleWrapper extends Component{
    constructor(props) {
        super(props)
        this.dropValue = new Animated.Value(0);
        this.dropValue.addListener(({ value }) => {
            //console.log(value) //Assumed Y value
            this.checkCollision(value);
        })
    }

    checkCollision = (value) => {
        let playerCoordinates = {
            centerX: this.props.playerPosition + playerSize,
            centerY: playerTop + playerSize,
            radius: playerSize,
        }

        let CircleX = playerCoordinates.centerX;
        let CircleY = playerCoordinates.centerY;
        let CircleRadius = playerCoordinates.radius;

        let RectX = this.props.left;
        let RectY = value-this.props.height;

        let DeltaX = CircleX - Math.max(RectX, Math.min(CircleX, RectX + this.props.width));
        let DeltaY = CircleY - Math.max(RectY, Math.min(CircleY, RectY + this.props.height));

        if((DeltaX * DeltaX + DeltaY * DeltaY) < (CircleRadius * CircleRadius)){
            this.props.playerGotHit(this);
        }
    }
    
    componentDidMount() {
        this.drop()
    }

    drop() {
        this.dropValue.setValue(0)
        Animated.timing(
            this.dropValue,
            {
                //toValue was 1
                toValue: Dimensions.get('window').height + this.props.height * 2,
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
            inputRange: [0, Dimensions.get('window').height + this.props.height * 2],
            outputRange: [0, Dimensions.get('window').height + this.props.height * 2]
        })
        return(
            <Animated.View
                style={{
                    transform: [{ translateY: drop }],
                    top: -this.props.height,
                    left: this.props.left,
                    position: 'absolute',
                }}
            >
                <Svg
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
            </Animated.View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playerPosition: state.player.position,
        playerTop: state.player.top,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

const Rectangle = connect(mapStateToProps, mapDispatchToProps)(
    RectangleWrapper
);

export default Rectangle;