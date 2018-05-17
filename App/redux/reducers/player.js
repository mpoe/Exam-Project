//Player store

import { UPDATE_PLAYER_POSITION, UPDATE_PLAYER_INVULNERABLE } from '../actions/actionTypes';
import {playerTop} from '../../constants/'

const defaultState = {
    position: 0,
    top: playerTop,
    invulnerable: false,
}

export const player = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_PLAYER_POSITION:
            return {
                ...state,
                position: action.payload,
            }
        case UPDATE_PLAYER_INVULNERABLE:
            return {
                ...state,
                invulnerable: action.payload,
            }
        default:
            return state;
    }
}