import React, { FC } from "react";
import styled from "styled-components";
import { Button, ButtonProps, CircularProgress } from "@material-ui/core";

interface Props extends ButtonProps {
  isLoading: boolean;
}

export const LoadingButton: FC<Props> = ({
  isLoading,
  children,
  ...buttonProps
}) => (
  <Wrapper>
    <Button
      variant="contained"
      color="primary"
      disabled={isLoading}
      fullWidth
      {...buttonProps}
    >
      {children}
    </Button>
    {isLoading && <StyledProgress size={24} />}
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledProgress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
`;
