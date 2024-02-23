import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { signIn } from "~/lib/apis/users"

const initialState = {
  loading : "idle",
  // user : localStorage.getItem(AUTH_KEY) ?? null
  user : {
    handle : "",
    tier: 0,
  }
}


const clientLogin = createAsyncThunk(
  "user/clientLogin",
  async(data, thunkAPI) => {
    const user = await signIn(data.nickname);
    return user
  }
)

const userSlice = createSlice({
  name : "user",
  initialState : initialState,
  reducers : {
    initClient(state, action){
      state.loading = 'idle'
      state.user.handle = "",
      state.user.tier = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.loading  = "fulfilled";
          if(action.type === "user/clientLogin/fulfilled"){
            state.user.handle = action.payload.handle;
            state.user.tier = action.payload.tier;
          } else {
            state.user = null
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = "pending";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = "rejected";
        }
      )
  }
})

export const {initClient} = userSlice.actions;

export {clientLogin};

export default userSlice.reducer;