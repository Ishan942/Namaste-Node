import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {

    addrequests: (state, action) => {
      return action.payload;
    },

    removerequests: (state, action) => {
      const newValue = state.filter((value) => value._id !== action.payload);
      return newValue
    },
  },
});

export const { addrequests, removerequests } = requestsSlice.actions;
export default requestsSlice.reducer;
