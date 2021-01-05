import { FC, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Home } from "@material-ui/icons";

import { Path } from "../typing/enum/path";

export const Header: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const title: string = useMemo(() => {
    switch (location.pathname as Path) {
      case Path.Home:
        return "Schlagwort-Bingo";
      case Path.CreateGame:
        return "Spiel erstellen";
      case Path.JoinGame:
        return "Spiel beitreten";
      default:
        return "Schlagwort-Bingo";
    }
  }, [location.pathname]);

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => history.push(Path.Home)}
        >
          <Home />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};
