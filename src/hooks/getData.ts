import axios from "axios";
import { Story } from "../types";
// import { Story } from "../types/index";

export async function getNews(): Promise<number[] | Error> {
  try {
    const { data } = await axios.get<number[]>(
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(error.message);
    } else {
      return new Error("An unexpected error occurred");
    }
  }
}

export async function getStory(id: number): Promise<Story | Error> {
  try {
    const { data } = await axios.get<Story>(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );

    return storyMapper(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(error.message);
    } else {
      return new Error("An unexpected error occurred");
    }
  }
}

export function storyMapper(arg: any): Story {
   return {
    by: (arg.by) ? String(arg.by) : "",
    descendants: (arg.descendants) ? Number(arg.descendants) : 0,
    id: (arg.id) ? Number(arg.id) : 0,
    kids: (arg.kids) ? Array(arg.kids) : [],
    score: (arg.score) ? Number(arg.score) : 0,
    time: (arg.time) ? Number(arg.time) : 0,
    title: (arg.title) ? String(arg.title) : '',
    type: (arg.type) ? String(arg.type) : '',
    url: (arg.url) ? String(arg.url) : '',
  }
}
