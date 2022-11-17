import axios from "axios";
import { Story } from "../types/index";
import { Comment } from "../types/index";

export async function getNews(): Promise<number[] | Error> {
  try {
    const { data } = await axios.get<number[]>(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
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

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(error.message);
    } else {
      return new Error("An unexpected error occurred");
    }
  }
}

export async function getComment(id: number): Promise<Comment | Error> {
  try {
    const { data } = await axios.get<Comment>(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
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

