import axios from "axios";

export async function getData<R>(path: string): Promise<R | Error> {
  const HackerNewsClient = axios.create({
    baseURL: "https://hacker-news.firebaseio.com/v0/",
  });

  try {
    const { data } = await HackerNewsClient.get<R>(path);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(error.message);
    } else {
      return new Error("An unexpected error occurred");
    }
  }
}
