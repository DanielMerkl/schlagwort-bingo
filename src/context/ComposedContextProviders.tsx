import React, { FC } from "react";

import { UserContextProvider } from "./UserContext";
import { SnackbarContextProvider } from "./SnackbarContext";

export const ComposedContextProviders: FC = ({ children }) => (
  <UserContextProvider>
    <SnackbarContextProvider>{children}</SnackbarContextProvider>
  </UserContextProvider>
);
