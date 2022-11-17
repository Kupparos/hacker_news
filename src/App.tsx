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
import { getNews } from "./hooks/getData";
import { ErrorPage } from "./components/ErrorPage";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [newsIds, setNewsIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

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
    getNewsIds().then(() => {
      setIsLoading(false);
    });
    return setUpdate(false);
  }, [update]);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(true);
      getNewsIds().then(() => {
        setIsLoading(false);
      });
    }, 60000);
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
                <MainPage ids={newsIds} update={update} setUpdate={setUpdate} />
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
