import { Theme, useMediaQuery } from "@material-ui/core";

export const useMobileScreen = (): boolean => {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
};
