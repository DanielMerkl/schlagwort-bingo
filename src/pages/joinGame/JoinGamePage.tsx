import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";

import { Path } from "../../typing/enum/Path";

export const JoinGamePage: FC = () => {
  const history = useHistory();

  const [invitationCode, setInvitationCode] = useState("");

  const handleJoinClick = () => {
    history.push(`${Path.Game}/${invitationCode}`);
  };

  return (
    <Wrapper>
      <Typography>Join Game</Typography>
      <TextField
        variant="outlined"
        color="primary"
        inputMode="numeric"
        label="vierstelliger Einladungscode"
        value={invitationCode}
        onChange={(event) => setInvitationCode(event.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleJoinClick}>
        Beitreten
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  align-content: start;
`;
