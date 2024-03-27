import { createSlice } from "@reduxjs/toolkit";

const initialAlarmModal = { showModal: false };

const alarmModalSlice = createSlice({
  name: "alarmModal",
  initialState: initialAlarmModal,
  reducers: {
    openModal(state) {
      state.showModal = true;
    },
    closeModal(state) {
      state.showModal = false;
    },
  },
});

export const alarmModalActions = alarmModalSlice.actions;
export default alarmModalSlice.reducer;
