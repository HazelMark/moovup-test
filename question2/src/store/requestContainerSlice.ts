import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { GetFriendsAlias } from "../services/FriendApi";
import {
  friendsReceived,
} from "./dataReceiveSlice";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type RequestPayload = {
  alias: string;
  request: AxiosRequestConfig;
};

export const requestThunk = createAsyncThunk("request/data", async (payload: RequestPayload | undefined, { dispatch }) => {
  if (payload === undefined) {
    console.log("Invalid request");
    dispatch(errorRequest({ name: "Invalid request", error: "Invalid request" }));
  } else {
    let anyError = false;
    let completeMessage: string = "";

    let request = payload as RequestPayload

    // Fire the requests
    await sleep(200);
    dispatch(initRequest({ name: request.alias }));
    try {
      const response = await axios(request.request);
      switch (request.alias) {
        case GetFriendsAlias:
          dispatch(friendsReceived({ data: response.data }));
          break;
      }

      await sleep(300);
      dispatch(completeRequest({ name: request.alias, data: response.data.content }));
      await sleep(50);
      dispatch(resetRequest({ name: request.alias }));
    } catch (error) {
      anyError = true;
      let message = "";
      if (axios.isAxiosError(error)) {
        const e = error as AxiosError;
        if (e.response && (e.response.status === 400 || e.response.status === 408 || e.response.status >= 500 || e.response.status === 401)) {
          // If the error is out status code 400, then throw the error string to the frontend.
          if (e.response.status === 408) {
            message = e.response.data + "";
          } else if (e.response.status === 400) {
            message = e.response.data + "";
          } else if (e.response.status === 503) {
            message = "Opps.. Server is unavailable now";
          } else if (e.response.status === 500) {
            message = e.response.data + "";
          } else if (e.response.status === 401) {
            message = "Please refresh the page in web browser to apply newest system version.";
          }
        } else {
          message = e.message;
        }
      } else {
        message = JSON.stringify(error);
      }

      console.error(error);
      dispatch(errorRequest({ name: request.alias, error: message }));
    }
    
    await sleep(50);
    if (anyError === false && completeMessage) {
      console.log("[requestContainer] Toast:", completeMessage);
    }
  }
});

type theData = {
  name: string,
  lastExecute: Date,
  isDone?: boolean,
  data: Data,
  error?: string,
};
type Container = { [key: string]: theData } & Object;
type Data = any;

export interface ContainerState {
  container: Container;
  stillLoading: boolean;
}

const initialState: ContainerState = { container: {}, stillLoading: false };
export const requestContainerSlice = createSlice({
  name: "container",
  initialState,
  reducers: {
    initRequest: (state: ContainerState, action: PayloadAction<{ name: string }>) => {
      const { payload } = action;
      const container = state.container;

      let data = {} as any;
      data[payload.name] = { name: payload.name, lastExecute: new Date(), isDone: false, data: {} };

      state.container = { ...state.container, ...data };
      state.stillLoading = true;
    },

    completeRequest: (state: ContainerState, action: PayloadAction<{ name: string; data: Data }>) => {
      const { name, data } = action.payload;
      state.container[name].isDone = true;
      state.container[name].data = data;

      state.stillLoading = !Object.values(state.container).every((x: theData) => x.isDone !== false);
    },
    errorRequest: (state: ContainerState, action: PayloadAction<{ name: string; error: string }>) => {
      const { payload } = action;

      state.container[payload.name].isDone = true;

      state.container[payload.name].error = payload.error;
      

      console.error("errorRequest", action, payload);

      state.stillLoading = !Object.values(state.container).every((x: theData) => x.isDone !== false);
    },
    resetRequest: (state: ContainerState, action: PayloadAction<{ name: string }>) => {
      const { payload } = action;
      if (state.container[payload.name]) {
        state.container[payload.name].isDone = undefined;
      }
      console.log("Reset request", state.container);
    },
  },
});

export const { initRequest, completeRequest, errorRequest, resetRequest } = requestContainerSlice.actions;

export default requestContainerSlice.reducer;
