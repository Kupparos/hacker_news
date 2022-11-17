import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Story } from "../../types";

interface StoryState {
  storyList: Story[];
}

const initialState: StoryState = {
  storyList: [],
};

export const storySlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addStoryInList: (state, action: PayloadAction<Story>) => {
      const story = action.payload;

      if (!state.storyList.find((item) => item.id === story.id)) {
        state.storyList.push(story);
      }
    },
  },
});

export const { addStoryInList } = storySlice.actions;
export default storySlice.reducer;
