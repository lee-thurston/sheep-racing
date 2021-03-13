import { SET_USER, SetUserAction } from "../actions/setUser.action"
import { SET_AUTHORISED_USER, SetAuthorisedUserAction } from "../actions/setAuthorisedUser.action"

export type State = {
    currentUser: string,
    authorisedUsers: string[]
}

const initialState: State = {
    currentUser: '',
    authorisedUsers: []
}

type UserAction = SetUserAction | SetAuthorisedUserAction

export function twitchReducer(state: State = initialState, action: UserAction) {


    switch (action.type) {
        case SET_USER:
                return {...state, currentUser: action.currentUser}
        case SET_AUTHORISED_USER:
                return {...state, authorisedUsers: action.authorisedUsers}
        default:
            return initialState;
    }
}

export default twitchReducer