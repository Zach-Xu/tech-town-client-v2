import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/responseTypes";

export interface AppState {
    user: User | undefined
}

const initialState: AppState = {
    user: undefined
}

const appSlice = createSlice({
    name: 'tech_town',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => ({
            ...state,
            user: action.payload
        })
    }
})

export const { updateUser } = appSlice.actions
export default appSlice.reducer