import { StackNavigator } from 'react-navigation';

import Game from '../containers/Game';
import Login from '../containers/Login'


export const AppNavigator = StackNavigator({
    Home: {
        screen: Game,
        navigationOptions: {
            tabBarVisible: false,
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            tabBarVisible: false,
            header: null
        }
    },
    Game: {
        screen: Game,
        navigationOptions: {
            tabBarVisible: false,
            header: null
        }
    }
})