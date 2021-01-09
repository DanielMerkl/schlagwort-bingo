import React, { FC } from "react";
import { LinearProgress } from "@material-ui/core";

interface Props {
  isLoading: boolean;
}

export const HorizontalLoadingIndicator: FC<Props> = ({ isLoading }) => (
  <>{isLoading ? <LinearProgress /> : <div style={{ height: "4px" }} />}</>
);
