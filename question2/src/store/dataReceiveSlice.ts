import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Friend } from "../typing/model";

export interface DataState {
  token: string;
  friends: Friend[];
}

const initialState: DataState = {
  token: "b2atclr0nk1po45amg305meheqf4xrjt9a1bo410",
  friends: [],
}; 

const dataReceiveSlice = createSlice({
  name: "receiver",
  initialState,
  reducers: {
    friendsReceived: (state: DataState, action: PayloadAction<{ data: any[] }>) => {
      state.friends = [...action.payload.data];
    },
  },
});

export const {
  friendsReceived,
} = dataReceiveSlice.actions;

export default dataReceiveSlice.reducer;
