import { UPDATE_USER_INFO } from '../actions/actionTypes';

export const updateUserInfo = (payload) => {
    console.log("Called UpdateUserInfo")
    console.log(payload)
    return {
        type: UPDATE_USER_INFO,
        payload: payload
    }; 
};