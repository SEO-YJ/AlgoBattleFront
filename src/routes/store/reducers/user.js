import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchRanking, fetchUserData, signIn } from "~/lib/apis/users"

const initialState = {
  loading : "idle",
  // user : localStorage.getItem(AUTH_KEY) ?? null
  user : {
    handle : "",
    tier: 0,
    _id : ""
  }
}


const clientLogin = createAsyncThunk(
  "user/clientLogin",
  async(data, thunkAPI) => {
    const user = await signIn(data.nickname);
    return user
  }
)

const fetchUserRanking = createAsyncThunk(
  "user/fetchUserRanking",
  async(data, thunkAPI) => {
    const users = await fetchRanking();
    return users
  }
)

const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async(data, thunkAPI) => {
    // console.log(data);
    const user = await fetchUserData(data.userName);
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
      state.user._id = ""
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
            state.user._id = action.payload._id;
          } else if(action.type === "user/fetchUserRanking/fulfilled"){
            return
          } else if(action.type === "user/fetchUser/fulfilled"){
            return
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

export {clientLogin, fetchUserRanking, fetchUser};

export default userSlice.reducer;