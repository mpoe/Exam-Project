import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';

import Svg, {
    Polygon,
} from 'react-native-svg';

import { connect } from 'react-redux';

import { playerSize, playerTop } from '../constants'

var { height, width } = Dimensions.get('window');

class TriangleWrapper extends Component {
    constructor(props) {
        super(props)
        this.dropValue = new Animated.Value(0);
        this.dropValue.addListener(({ value }) => {
            //console.log(value) //Assumed Y value
            this.checkCollision(value);
        })
    }

    componentDidMount() {
        this.drop()
    }

    checkCollision = (value) => {
        let points = this.props.points.replace(/,/g, ".");
        points = points.split(/[\s.]/)

        //Contains the points of a given triangle
        let triangleCoordinates = [
            {
                x: parseInt(this.props.left) + parseInt(points[0]),
                y: parseInt(value) + parseInt(points[1]) - this.props.height,
            },
            {
                x: parseInt(this.props.left) + parseInt(points[2]),
                y: parseInt(value) + parseInt(points[3]) - this.props.height,
            },
            {
                x: parseInt(this.props.left) + parseInt(points[4]),
                y: parseInt(value) + parseInt(points[5]) - this.props.height,
            }
        ]
        let playerCoordinates = {
            centerX: this.props.playerPosition + playerSize,
            centerY: playerTop + playerSize,
            radius: playerSize,
        }

        triangleCoordinates.map((point) => {
            triangleCoordinates.map((point2) => {
                let dX = point.x - point2.x;
                //bY                        //aY
                let dY = point.y - point2.y;
                if (dX == 0 && dY == 0) {
                    // A and B are the same points, no way to calculate intersection
                    return;
                }

                let dl = (dX * dX + dY * dY);

                let t = ((playerCoordinates.centerX - point2.x) * dX + (playerCoordinates.centerY - point2.y) * dY) / dl;

                let nearestX = point2.x + t * dX;
                let nearestY = point2.y + t * dY;
                let dist = this.calculateDistance(nearestX, nearestY, playerCoordinates.centerX, playerCoordinates.centerY)
                if (dist <= playerCoordinates.radius) {
                    if (t < 0 || t > 1) {
                        // intersection point is not actually within line segment
                        return;
                    } else {
                        //HIT
                        this.props.playerGotHit(this);
                    }
                }
            })
        })
    }

    calculateDistance = (x1, y1, x2, y2) => {
        var a = x1 - x2;
        var b = y1 - y2;

        return Math.sqrt(a * a + b * b);
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
    render() {
        const drop = this.dropValue.interpolate({
            //was [0,1]
            inputRange: [0, Dimensions.get('window').height + this.props.height * 2],
            outputRange: [0, Dimensions.get('window').height + this.props.height * 2]
        })
        return (
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
    return {
        playerPosition: state.player.position,
        playerTop: state.player.top,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

const Triangle = connect(mapStateToProps, mapDispatchToProps)(
    TriangleWrapper
);

export default Triangle;