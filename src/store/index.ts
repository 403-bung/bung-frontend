import { configureStore } from "@reduxjs/toolkit";
import alarmModal from "./alarmModal";
import changeNickname from "./changeNickname";

export interface ToolkitStore {
  alarmModal: { showModal: boolean };
  changeNickname: { isChangedNickname: boolean; closed: boolean };
}

const store = configureStore({
  reducer: {
    alarmModal: alarmModal,
    changeNickname: changeNickname,
  },
});

export default store;
