import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  active:localStorage.getItem("activeChat") ? JSON.parse(localStorage.getItem("activeChat")) :"Ariyan Eiasin",
}

export const activeChatSlice = createSlice({
  name: 'activeChat',
  initialState,
  reducers: {
    activeChat: (state,action) => {
      state.active = action.payload
     },
  },
})

export const { activeChat } = activeChatSlice.actions

export default activeChatSlice.reducer