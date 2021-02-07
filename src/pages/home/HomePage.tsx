import { FC } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { Add, ExitToApp } from "@material-ui/icons";
import styled from "styled-components";

import { Path } from "../../typing/enum/Path";

export const HomePage: FC = () => {
  const history = useHistory();

  return (
    <PageWrapper>
      <Typography variant="h4" align="center">
        Lust auf eine Runde Schlagwort-Bingo?
      </Typography>
      <Typography align="center">
        Erstelle ein neues Spiel oder trete einem bestehenden Spiel bei!
      </Typography>
      <ButtonWrapper>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => history.push(Path.JoinGame)}
          startIcon={<ExitToApp />}
        >
          beitreten
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push(Path.CreateGame)}
          startIcon={<Add />}
        >
          erstellen
        </Button>
      </ButtonWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.main`
  max-width: 450px;
  margin: 0 auto;
  align-self: start;
  padding: 2rem 1rem;
  display: grid;
  gap: 2rem;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 1rem;
  align-content: end;
`;
