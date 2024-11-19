import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    firstname: null,
    lastname: null,
    email: null,
  },
  // token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user.firstname = action.payload.firstname;
      state.user.lastname = action.payload.lastname;
      state.user.email = action.payload.email;
      // state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = { firstname: null, lastname: null, email: null };

      // state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
