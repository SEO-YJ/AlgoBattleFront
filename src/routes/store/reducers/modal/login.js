import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  show : false
}

const showLoginSlice = createSlice({
  name : "showLogin",
  initialState : initialState,
  reducers : {
    handleClose(state){
      state.show = false;
    },
    handleShow(state){
      state.show = true;
    }
  }
})

export const {handleClose, handleShow} = showLoginSlice.actions;

export default showLoginSlice.reducer;