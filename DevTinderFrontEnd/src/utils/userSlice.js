import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // Stores the list of users
};

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    // Action to add a user
    addUser: (state, action) => {
      return action.payload;
    },
    // Action to remove a user by ID
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
