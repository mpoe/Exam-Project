import {combineReducers , createStore, applyMiddleware} from 'redux';
import sagas from '../sagas';
import createSagaMiddleware from 'redux-saga';
import { player } from './player';

const combinedReducers = combineReducers({
    player: player,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    combinedReducers,
    applyMiddleware(
        sagaMiddleware
    ),
);

sagaMiddleware.run(sagas);

