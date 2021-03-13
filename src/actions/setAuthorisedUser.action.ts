export type SET_AUTHORISED_USER = 'SET_AUTHORISED_USER';
export const SET_AUTHORISED_USER: SET_AUTHORISED_USER = 'SET_AUTHORISED_USER';

export interface SetAuthorisedUserAction {
    type: SET_AUTHORISED_USER
    authorisedUsers: string[]
}

export function createSetAuthorisedUserAction(authorisedUsers: string[]): SetAuthorisedUserAction  {
    return {
        type: SET_AUTHORISED_USER,
        authorisedUsers
    }
}