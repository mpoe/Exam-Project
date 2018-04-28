import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {store} from './redux/reducers';

import Game from './containers/Game'
import {AppNavigator} from './router/navigationStack'

export default class GameApp extends Component{
    render(){
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}