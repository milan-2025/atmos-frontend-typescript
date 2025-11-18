// create slice using createSlice method.

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IhandleLoginPayload, IinitialAuthValue } from "./storeInterfaces";
import { handleLocalStorageLogin, handleLocalStorageLogout } from "@/helpers/authentication";

const initialValue:IinitialAuthValue = {
    token:null,
    expirationTime:null,
    fullName: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        handleLogin: (state,action: PayloadAction<IhandleLoginPayload>)=>{
            handleLocalStorageLogin(action.payload.token,action.payload.expirationTime)
            state.token = action.payload.token;
            state.expirationTime = action.payload.expirationTime;
        },
        setName: (state,action : PayloadAction<{
            fullName: string;
        }>)=>{
            state.fullName = action.payload.fullName;
        },
        handleLogout: ()=>{
            handleLocalStorageLogout();
            return initialValue
        }
    }
})

export const {handleLogin,setName,handleLogout} = authSlice.actions;

export default authSlice