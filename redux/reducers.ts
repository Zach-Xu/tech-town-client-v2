import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InboxVO } from "../types/vo/inboxVO";
import { UserVO } from "../types/vo/userVO";

export interface AppState {
    user: UserVO | undefined,
    selectedInbox: InboxVO | undefined
}

const initialState: AppState = {
    user: undefined,
    selectedInbox: undefined
}

const appSlice = createSlice({
    name: 'tech_town',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserVO>) => ({
            ...state,
            user: action.payload
        }),
        updateSelectedInbox: (state, action: PayloadAction<InboxVO>) => ({
            ...state,
            selectedInbox: action.payload
        })
    }
})

export const { updateUser, updateSelectedInbox } = appSlice.actions
export default appSlice.reducer