import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, StylesProvider } from "@material-ui/styles";

import { theme } from "../utils/theme";
import { UserContextProvider } from "../context/UserContext";
import { SnackbarContextProvider } from "../context/SnackbarContext";

export const ComposedProviders: FC = ({ children }) => (
  <BrowserRouter>
    <UserContextProvider>
      <SnackbarContextProvider>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </StylesProvider>
      </SnackbarContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
