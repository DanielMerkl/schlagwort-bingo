import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";

import { theme } from "../utils/theme";
import { UserContextProvider } from "../context/UserContext";
import { SnackbarContextProvider } from "../context/SnackbarContext";

export const ComposedProviders: FC = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <UserContextProvider>
          <SnackbarContextProvider>
            <CssBaseline />
            {children}
          </SnackbarContextProvider>
        </UserContextProvider>
      </StylesProvider>
    </ThemeProvider>
  </BrowserRouter>
);
