import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Story } from "../../types";
// import { RootState } from "../store";
// import { enableMapSet } from "immer";

// enableMapSet();

interface StoryState {
  storyList: Story[]
}

const initialState: StoryState = { 
  storyList: [] 
};

export const storySlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addStoryInList: (state, action: PayloadAction<Story>) => {
      const story = action.payload;

      state.storyList.push(story);
    },
  },
});

export const { addStoryInList } = storySlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.storyList.storyList

export default storySlice.reducer;
