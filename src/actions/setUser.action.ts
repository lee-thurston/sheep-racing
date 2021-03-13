export type SET_USER = 'SET_USER';
export const SET_USER: SET_USER = 'SET_USER';

export interface SetUserAction {
    type: SET_USER
    currentUser: string
}

export function createSetUserAction(user: string): SetUserAction  {
    return {
        type: SET_USER,
        currentUser: user
    }
}