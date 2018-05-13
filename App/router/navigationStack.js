import { StackNavigator } from 'react-navigation';

import Game from '../containers/Game';
import Login from '../containers/Login';
import Welcome from '../containers/Welcome';
import Register from '../containers/Register';


export const AppNavigator = StackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            tabBarVisible: false,
            header: null
        },
        portraitOnlyMode: true
    },
    Home: {
        screen: Game,
        navigationOptions: {
            tabBarVisible: true,
            header: null
        },
        portraitOnlyMode: true
    },
    Login: {
        screen: Login,
        navigationOptions: {
            tabBarVisible: true,
            header: null
        },
        portraitOnlyMode: true
    },
    Register: {
        screen: Register,
        navigationOptions: {
            tabBarVisible: true,
            header: null
        },
        portraitOnlyMode: true
    },
    Game: {
        screen: Game,
        navigationOptions: {
            tabBarVisible: true,
            header: null
        },
        portraitOnlyMode: true
    }
})