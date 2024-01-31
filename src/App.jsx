import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import {
  HomePage,
  AddPage,
  DetailPage,
  ArchivedPage,
  NotFound,
  RegisterPage,
  LoginPage,
  TesPage,
} from "./pages";
import ThemeContext from "./context/ThemeContext";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import LocaleContext from "./context/LocaleContext";
import lang from "./utils/lang";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const themeContextValue = useMemo(() => {
    return { theme, toggleTheme };
  }, [theme]);

  const toggleLocale = (locale) => {
    setLocale(() => {
      localStorage.setItem("locale", locale);
      return locale;
    });
  };

  const localeContextValue = useMemo(() => {
    return { locale, toggleLocale };
  }, [locale]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.title = lang[locale].header.title;
  }, [theme, locale]);

  useEffect(() => {
    async function getUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    getUser();
    console.log("env", import.meta.env.VITE_NAME);
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken("");
  }

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className="app-container">
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/test" element={<TesPage />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="app-container">
          <header>
            <Navigation user={authedUser} logout={onLogout} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="/archives" element={<ArchivedPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
