import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { Route, Switch } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import { MainPage } from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import { getNews } from "./hooks/getData";
import { ErrorPage } from "./components/ErrorPage";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [newsIds, setNewsIds] = useState<number[]>([]);
  // const [newsStoryList, setNewsStoryList] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getNewsIds = async () => {
    const data = await getNews();

    if (data instanceof Error) {
      setError(true);
    } else {
      setNewsIds(data);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getNewsIds().then(() => setIsLoading(false));
  }, []);

  // useEffect(() => {}, [newsIds]);

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
                <p style={{ margin: "20px" }}>Loading...</p>
              ) : (
                <MainPage ids={newsIds} />
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
