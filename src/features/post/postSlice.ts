import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchData } from "./postAPI";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostState {
  value: IPost[];
  status: "idle" | "loading" | "failed";
}

const initialState: PostState = {
  value: [],
  status: "idle",
};

export const dataPostAsync = createAsyncThunk("counter/fetchData", () =>
  fetchData()
);

export const postSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dataPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(dataPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(dataPostAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const completedTasksSelector = (
  userId: number | undefined,
  title: string
) =>
  createSelector(
    (state: RootState) => state.posts,
    (posts) => {
      const filterDataByTitle = posts.value.filter((post) =>
        post.title.toUpperCase().includes(title.toUpperCase())
      );

      return {
        value: userId
          ? filterDataByTitle.filter((post) => post.userId === userId)
          : filterDataByTitle,
        loading: posts.status,
      };
    }
  );

export default postSlice.reducer;
