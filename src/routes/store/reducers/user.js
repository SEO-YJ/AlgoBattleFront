import { createSlice } from "@reduxjs/toolkit"

const AUTH_KEY = "AUTH_USER"

const initialState = {
  bojNickname : localStorage.getItem(AUTH_KEY) ?? null
}

const userSlice = createSlice({
  name : "user",
  initialState : initialState,
  reducers : {
    clientLogin(state, action){
      state.bojNickname = action.payload
      localStorage.setItem(AUTH_KEY, action.payload)
    },
    clientLogout(state, action){
      state.bojNickname = null
      localStorage.removeItem(AUTH_KEY);
    }
  }
})

export const {clientLogin, clientLogout} = userSlice.actions;

export default userSlice.reducer;