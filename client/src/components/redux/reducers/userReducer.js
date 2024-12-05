import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    bio: null,
    profile_photo: null,
    following: null,
    followers: null,
  },
  // token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;

      state.user = state.user || {
        firstname: null,
        lastname: null,
        email: null,
        bio: null,
        profile_photo: null,
        following: null,
        followers: null,
      };

      state.user.firstname = action.payload.firstname || null;
      state.user.lastname = action.payload.lastname || null;
      state.user.email = action.payload.email || null;
      state.user.bio = action.payload.bio || null;
      state.user.profile_photo = action.payload.profile_photo || null;
      state.user.following = action.payload.following || null;
      state.user.followers = action.payload.followers || null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = { firstname: null, lastname: null, email: null };
    },
    updateUser(state, action) {
      state.user.firstname = action.payload.firstname || state.user.firstname;
      state.user.lastname = action.payload.lastname || state.user.lastname;
      state.user.bio = action.payload.bio || state.user.bio;
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
