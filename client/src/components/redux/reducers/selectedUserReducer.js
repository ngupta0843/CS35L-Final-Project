
import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initialState = {
  selectedUser: null,
};

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
});

export const { setSelectedUser, clearSelectedUser } = selectedUserSlice.actions;

const persistConfig = {
    key: 'selectedUser',
    storage,
};

const persistedUser = persistReducer(persistConfig, selectedUserSlice.reducer);

export default persistedUser;