import { UPDATE_PLAYER_POSITION } from '../actions/actionTypes';

export const updatePlayerPosition = (position) => {
    return {
        type: UPDATE_PLAYER_POSITION,
        payload: position
    }; 
};