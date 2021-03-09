import { User } from '../API';

export const getUsersFromLocalStorage = (key: string) => {
    const value = (localStorage.getItem(key) || '[]');
    let users: User[] = [];
    try {
        const parsedJSON = JSON.parse(value);
        if (Array.isArray(parsedJSON)) {
            users = parsedJSON;
        }
    } catch (e) {
        users = [];
    }
    
    return users;
}

export const saveUsersToLocalStorage = (key: string, data: User[]) => localStorage.setItem(key, JSON.stringify(data));