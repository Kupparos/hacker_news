import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  LoadingOverlay,
} from "@mantine/core";
import { Route, Switch, useLocation } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import { MainPage } from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import { getData } from "./hooks/getData";
import { ErrorCard } from ".//components/ErrorCard";
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

  const location = useLocation();

  const dispatch = useAppDispatch();

console.log(location)

  const getNewsList = async () => {
    if (location.pathname !== "/") {
      return;
    }

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
  }, [update, location.pathname]);

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
          <ErrorCard />
        ) : (
          <Switch>
            <Route path="/news/:id">
              <NewsPage />
            </Route>
            <Route path="/">
              {isLoading ? (
                <LoadingOverlay
                  visible={true}
                  overlayBlur={2}
                  loaderProps={{ color: "yellow", variant: "bars" }}
                />
              ) : (
                <MainPage update={update} setUpdate={setUpdate} />
              )}
            </Route>
          </Switch>
        )}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
