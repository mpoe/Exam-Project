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
    },
    Home: {
        screen: Game,
        navigationOptions: {
            tabBarVisible: true,
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            tabBarVisible: true,
            header: null
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            tabBarVisible: true,
            header: null
        }
    },
    Game: {
        screen: Game,
        navigationOptions: {
            tabBarVisible: true,
            header: null
        }
    }
})