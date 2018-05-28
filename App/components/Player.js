
import React, { Component } from 'react';
import Svg,{Circle} from 'react-native-svg';
import {
    View,
    StyleSheet,
    Slider, 
    Dimensions,
    Animated,
    Easing,
} from 'react-native';

import { invulnerabilityTime } from '../constants/'

export class Player extends Component{
    constructor(props){
        super(props);
        this.state= {
            invulnerable: false,
            shouldAnimate: false,
            animatedTimes: 0,
            timesToAnimate: 7,
        }
        this.opacityValue = new Animated.Value(1);
        this.opacityValue.addListener(({ value }) => {
            //Might be unnecessary
        });
    }

    animate = () => {
        let timesToAnimate = 7;
        this.opacityValue.setValue(0)
        Animated.timing(
            this.opacityValue,
            {
                toValue: 1,
                duration: invulnerabilityTime,
                easing: Easing.bezier(.45,1.79,.51,-1)
            }
        ).start()
    }

    componentDidUpdate(){
        if(this.state.invulnerable && !this.state.shouldAnimate){
            this.setState({
                shouldAnimate:true,
            })
            this.animate();
            setTimeout(() => {
				this.setState({
                    shouldAnimate:false,
                })
			}, invulnerabilityTime);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.invulnerable){
            if(!prevState.invulnerable){
                return {
                    invulnerable:nextProps.invulnerable
                }
            }else{
                return null;
            }
        }else{
            return {invulnerable:nextProps.invulnerable}
        }
    }

    render(){
        return(
            <Animated.View
                style= {{
                    opacity: this.opacityValue,
                    position: 'absolute',
                    top:this.props.top,
                    left:this.props.position,
                }}
            >
                <Svg 
                    height={this.props.size*2}
                    width={this.props.size*2}
                >
                    <Circle
                        cx={this.props.size}
                        cy={this.props.size}
                        r={this.props.size}
                        fill="pink"
                    />
                </Svg>
            </Animated.View>
        );
    }   
}