import { UPDATE_PLAYER_POSITION, UPDATE_PLAYER_INVULNERABLE } from '../actions/actionTypes';

export const updatePlayerPosition = (position) => {
    return {
        type: UPDATE_PLAYER_POSITION,
        payload: position,
    }; 
};

export const updatePlayerInvulnerability = (invulnerability) => {
    return {
        type: UPDATE_PLAYER_INVULNERABLE,
        payload: invulnerability,
    }; 
}