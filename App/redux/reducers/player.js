//Player store

import { UPDATE_PLAYER_POSITION } from '../actions/actionTypes';

const defaultState = {
    position: 0,
}

export const player = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_PLAYER_POSITION:
            return {
                ...state,
                position: action.payload
            }
        default: 
            return state;
    }
}