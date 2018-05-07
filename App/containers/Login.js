
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    ScrollView,
    Dimensions
  } from 'react-native';

  import { connect } from 'react-redux';

 /*  import {LoginComp} from '../components/Login'
 */
  class LoginWrapper extends Component {
    constructor(props){
      super(props);
      this.state = {
        score: 0,
        name: "Morten",
        levelID: 1
      }
    }
    componentDidMount(){
      fetch('http://www.mpoe.dk/game/create-profile.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'mpoe',
          score: 20,
        }),
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          name: responseJSON.name,
          score: responseJSON.score
        })
      })
      .catch((error) => {
        console.error(error);
      });
      /*
      axios.post('http://www.mpoe.dk/game/create-profile.php', { name: 'mpoe'})
      .then((response) => console.log(response))
      .catch((error) => {
        console.error(error);
      });
      */
    }
    render(){
      console.log(this.state);
      return (
        <ScrollView>
          <Image style={{flex:1, resizeMode:'cover', maxWidth:'100%', justifyContent:'flex-start'}} source={require('../Media/portrait2.jpg')}/>
        </ScrollView>
      );
    }
  }

  const mapStateToProps = (state) => {
    return{
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
    };
  }
  
  const Login = connect(mapStateToProps, mapDispatchToProps)(
    LoginWrapper
  );
  
  export default Login;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })