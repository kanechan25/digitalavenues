import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataWeekly: [],
};

export const todosSlice = createSlice({
  name: "todosData",
  initialState,
  reducers: {
    updateTodosData: (state, { payload }) => {
      state.dataWeekly = payload;
    },
  },
});
