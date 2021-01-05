import { FC } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Add, ExitToApp } from "@material-ui/icons";
import styled from "styled-components";

import { Path } from "../../typing/enum/Path";

export const HomePage: FC = () => {
  const history = useHistory();

  return (
    <PageWrapper>
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
          Spiel erstellen
        </Button>
      </ButtonWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.main`
  height: 100%;
  max-width: 450px;
  margin: auto;
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 1rem;
  align-content: end;
`;
