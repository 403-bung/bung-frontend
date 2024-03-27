import { configureStore } from "@reduxjs/toolkit";
import alarmModal from "./alarmModal";

export interface ToolkitStore {
  alarmModal: { showModal: boolean };
}

const store = configureStore({
  reducer: {
    alarmModal: alarmModal,
  },
});

export default store;
