//user store

import { UPDATE_USER_INFO } from '../actions/actionTypes';

const defaultState = {
    name:"",
    token:"",
    facebookID:"",
}

export const user = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO:
            return {
                ...state,
                name: action.payload.name,
                token: action.payload.token,
                facebookID: action.payload.facebookID,
            }
        default: 
            return state;
    }
}