import { ADD_USER } from '../constants/actionTypes';
import { User, UserAction, DispatchType } from '../API';

export function addUser( user: User ) {
    const action: UserAction = {
        type: ADD_USER,
        payload: user,
    }
    return action;
}

export function dispatchAction( action: UserAction ) {
    return (dispatch: DispatchType) => {
        dispatch(action);
    }
}