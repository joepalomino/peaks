import React, { useState, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Notifications from "./components/notifications";
import DataArea from "./components/data-area";
import Login from "./components/Login";
import { ThemeProvider, useTheme } from 'emotion-theming'
import { darkMode, lightMode } from './utils/theme'
import Nav from './components/Nav'

/** @jsx jsx */
import { css, jsx, Global } from "@emotion/core";


// for authentication us auth0
import { useAuth0 } from "./contexts/auth0-context";

// for routing
import { Switch, Route } from "react-router-dom";

// for apollo client
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";


require('typeface-josefin-sans')
require('typeface-merriweather')

function App() {
  const {
    isLoading,
    user,
    loginWithRedirect,
    logout,
    getTokenSilently
  } = useAuth0();

  const [accessToken, setAccessToken] = useState("");
  const [theme, setTheme] = useState(lightMode)
  const [lightTheme, setLightTheme] = useState(true)

  if (isLoading) {
    return "Loading...";
  }

  const getAcessToken = async () => {
    try {
      const token = await getTokenSilently();
      setAccessToken(token);
    } catch (e) {
      console.log(e);
    }
  };

  getAcessToken();

  const httpLink = new HttpLink({
    uri: "https://peaks-be.herokuapp.com/v1/graphql"
  });

  const authLink = setContext((_, { headers }) => {
    const token = accessToken;
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`
        }
      };
    } else {
      return {
        headers: {
          ...headers
        }
      };
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <div css={{backgroundColor: lightTheme ? lightMode.bgColor : darkMode.bgColor, height: '100vh'}}> 
          <Global
            styles={css`
              body {
                background: #fff;
                font-family: "Josefin Sans", sans-serif;
                font-size: 16px;
              }
              p {
                line-height: 1.58;
              }
            `}
          />
          <div onClick={() => {
            setTheme(lightTheme ? darkMode : lightMode)
            setLightTheme(!lightTheme)
          }}><Nav /></div>
          {!isLoading && !user && <Login />}
          {!isLoading && user && (
            <div>
              <Header />
              hello {user.name}
              <DataArea />
              <Notifications />
            </div>
          )}
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
