import { combineReducers } from "redux"
import { twitchReducer, State } from "./twitch.reducer"

export type RootState = {
    twitch: State
}

export default combineReducers({
    twitch: twitchReducer
})