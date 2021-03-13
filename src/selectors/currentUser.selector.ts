import { RootState } from "../reducers";

export const getCurrentUser = (state: RootState) => state.twitch.currentUser;
export const getAuthorisedUsers = (state: RootState) => state.twitch.authorisedUsers;