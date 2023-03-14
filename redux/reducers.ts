import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserVO } from "../types/vo/userVO";

export interface AppState {
    user: UserVO | undefined
}

const initialState: AppState = {
    user: undefined
}

const appSlice = createSlice({
    name: 'tech_town',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserVO>) => ({
            ...state,
            user: action.payload
        })
    }
})

export const { updateUser } = appSlice.actions
export default appSlice.reducer