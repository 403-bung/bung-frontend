import { createSlice } from "@reduxjs/toolkit";

const initialChangeNickname = { isChangedNickname: false, closed: false };

const changeNicknameSlice = createSlice({
  name: "changeNickname",
  initialState: initialChangeNickname,
  reducers: {
    closeModal(state) {
      state.closed = true;
    },
    changeNickname(state) {
      state.isChangedNickname = true;
    },
    setInitial(state) {
      state.isChangedNickname = false;
      state.closed = false;
    },
  },
});

export const changeNicknameActions = changeNicknameSlice.actions;
export default changeNicknameSlice.reducer;
