import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  LoadingOverlay,
} from "@mantine/core";
import { Route, Switch } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import { MainPage } from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import { getData } from "./hooks/getData";
import { ErrorPage } from "./components/ErrorPage";
import { Story } from "./types";
import { useAppDispatch } from "./hooks/redux";
import { addStoryInList } from "./store/reducers/StoryReducer";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const getNewsList = async () => {
    const ids = await getData<number[]>("newstories.json");

    if (ids instanceof Error) {
      return setError(true);
    }

    ids.slice(0, 100).map((id) => getNews(id));
  };

  const getNews = async (id: number) => {
    const news = await getData<Story>(`item/${id}.json`);
    
    if (!(news instanceof Error)) {
      dispatch(addStoryInList(news));
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getNewsList().then(() => {
      setIsLoading(false);
    });

    return setUpdate(false);
  }, [update]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);

      getNewsList().then(() => {
        setIsLoading(false);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <PageHeader />
        {error ? (
          <ErrorPage />
        ) : (
          <Switch>
            <Route path="/news/:id">
              <NewsPage />
            </Route>
            <Route path="/">
              {isLoading ? (
                <LoadingOverlay visible={true} overlayBlur={2} />
              ) : (
                <MainPage update={update} setUpdate={setUpdate} />
              )}
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        )}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
