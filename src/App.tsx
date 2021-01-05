import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import { Path } from "./typing/enum/Path";
import { Header } from "./components/Header";
import { HomePage } from "./pages/home/HomePage";
import { CreateGamePage } from "./pages/createGame/CreateGamePage";
import { JoinGamePage } from "./pages/joinGame/JoinGamePage";

export const App = () => (
  <AppWrapper>
    <Header />
    <Switch>
      <Route exact path={Path.Home}>
        <HomePage />
      </Route>
      <Route path={Path.CreateGame}>
        <CreateGamePage />
      </Route>
      <Route path={Path.JoinGame}>
        <JoinGamePage />
      </Route>
      <Redirect to={Path.Home} />
    </Switch>
  </AppWrapper>
);

const AppWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;
