import {combineReducers , createStore, applyMiddleware} from 'redux';
import sagas from '../sagas';
import createSagaMiddleware from 'redux-saga';
import { player } from './player';
import { user } from './user';
 
const combinedReducers = combineReducers({
    player: player,
    user: user,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    combinedReducers,
    applyMiddleware(
        sagaMiddleware
    ),
);

sagaMiddleware.run(sagas);

