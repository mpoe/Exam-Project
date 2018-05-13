import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
  } from 'react-native';

  export default class Splitter extends Component{
      render(){
          return (
              <View style={{width: '90%', marginLeft:'5%', marginRight:'5%', justifyContent:'center', height:2, backgroundColor:'grey'}}></View>
          );
      }
  }