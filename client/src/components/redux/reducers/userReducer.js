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

      // Ensure `state.user` exists
      state.user = state.user || {
        firstname: null,
        lastname: null,
        email: null,
      };

      // Update `state.user` properties
      state.user.firstname = action.payload.firstname || null;
      state.user.lastname = action.payload.lastname || null;
      state.user.email = action.payload.email || null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = { firstname: null, lastname: null, email: null };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
