import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Easing
} from 'react-native';

import Svg, {
    Circle,
} from 'react-native-svg';

import { connect } from 'react-redux';

import { playerSize, playerTop } from '../constants'

var { height, width } = Dimensions.get('window');

class CoinWrapper extends Component {
    constructor(props) {
        super(props)
        this.dropValue = new Animated.Value(0);
        this.dropValue.addListener(({ value }) => {
            //console.log(value) //Assumed Y value
            if(this.state.visible){
                this.checkCollision(value);
            }
        });
        this.state = {
            visible: true,
        }
    }

    componentDidMount() {
        this.drop()
    }


    checkCollision = (value) => {
        let playerCoordinates = {
            centerX: this.props.playerPosition + playerSize,
            centerY: playerTop + playerSize,
            radius: playerSize,
        }

        let coinCoordinates = {
            centerX: this.props.left+this.props.size,
            centerY: value-this.props.size,
            radius: this.props.size,
        }
        
        let dx = coinCoordinates.centerX - playerCoordinates.centerX;
        let dy = coinCoordinates.centerY - playerCoordinates.centerY;
        let radii = coinCoordinates.radius + playerCoordinates.radius;
        if ( ( dx * dx )  + ( dy * dy ) < radii * radii ) 
        {
            if(this.state.visible){
                console.log("Called")
                this.props.pickUpCoin();
                this.setState({
                    visible:false,
                })
            }
        }
    }

    drop() {
        this.dropValue.setValue(0)
        Animated.timing(
            this.dropValue,
            {
                //toValue was 1
                toValue: Dimensions.get('window').height + this.props.size * 2,
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
            inputRange: [0, Dimensions.get('window').height + this.props.size * 2],
            outputRange: [0, Dimensions.get('window').height + this.props.size * 2]
        })
        return (
            
                <Animated.View
                    style={{
                        transform: [{ translateY: drop }],
                        top: -this.props.size*2,
                        left: this.props.left,
                        position: 'absolute',
                    }}
                >
                {this.state.visible == true &&
                    <Svg
                        width={this.props.size*2}
                        height={this.props.size*2}
                    >
                        <Circle
                            cx={this.props.size}
                            cy={this.props.size}
                            r={this.props.size}
                            fill="yellow"
                        />
                    </Svg>
                }
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

const Coin = connect(mapStateToProps, mapDispatchToProps)(
    CoinWrapper
);

export default Coin;