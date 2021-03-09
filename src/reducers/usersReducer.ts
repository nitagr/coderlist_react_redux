import { ADD_USER } from '../constants/actionTypes';
import { User, UserAction, UserState } from '../API';
import { getUsersFromLocalStorage, saveUsersToLocalStorage } from '../services/localStorage';

const initialState: UserState = {
    users: getUsersFromLocalStorage('users')
}

const usersReducer = (state: UserState = initialState, action: UserAction): UserState=> {
    console.log('type',action.type);
    console.log('payload', action.payload);
    switch (action.type){
        case ADD_USER:
            console.log('inside add');
            saveUsersToLocalStorage('users',[...state.users,action.payload]);
            return {
                ...state,
                users: [...state.users, action.payload ],
            }
        default:
            console.log('inside default');
            return state;

    }
    
}
export default usersReducer;