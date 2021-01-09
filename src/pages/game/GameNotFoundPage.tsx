import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import styled from "styled-components";

import { Path } from "../../typing/enum/Path";

export const GameNotFoundPage: FC = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Typography variant="h5" gutterBottom>
        Kein Spiel gefunden
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push(Path.Home)}
      >
        Zurück zur Startseite
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  max-width: 400px;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  align-content: start;
`;
