import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import styled from "styled-components";

import { Path } from "../../typing/enum/Path";
import { Firebase } from "../../firebase/Firebase";
import { HorizontalLoadingIndicator } from "../../components/HorizontalLoadingIndicator";

export const JoinGamePage: FC = () => {
  const history = useHistory();

  const [invitationCode, setInvitationCode] = useState("");
  const [gameExists, setGameExists] = useState(false);
  const [isCheckingCurrentCode, setIsCheckingCurrentCode] = useState(false);
  const [hasCheckedCurrentCode, setHasCheckedCurrentCode] = useState(false);

  const isValidInvitationCode = invitationCode.length === 4;
  const canJoinGame: boolean = isValidInvitationCode && gameExists;
  const noGameFound: boolean = hasCheckedCurrentCode && !gameExists;

  useEffect(() => {
    const checkIfGameExists = async () => {
      setIsCheckingCurrentCode(true);
      const documentSnapshot = await Firebase.firestore()
        .collection("games")
        .doc(invitationCode)
        .get();
      setGameExists(documentSnapshot.exists);
      setIsCheckingCurrentCode(false);
      setHasCheckedCurrentCode(true);
    };

    if (isValidInvitationCode) {
      checkIfGameExists();
    }
  }, [invitationCode, isValidInvitationCode]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value;
    if (updatedValue.length > 4) return;

    const isNumber: boolean = !isNaN(Number(updatedValue));
    if (isNumber) {
      setInvitationCode(updatedValue);
      setHasCheckedCurrentCode(false);
    }
  };

  const handleSubmit = () => {
    if (!canJoinGame) return;

    history.push(`${Path.Game}/${invitationCode}`);
  };

  const helperText: string = useMemo(() => {
    if (noGameFound) return "Kein Spiel gefunden!";
    if (hasCheckedCurrentCode && gameExists) return "Spiel gefunden!";

    return " ";
  }, [gameExists, hasCheckedCurrentCode, noGameFound]);

  return (
    <PageWrapper>
      <HorizontalLoadingIndicator isLoading={isCheckingCurrentCode} />
      <FormWrapper>
        <Typography variant="h5">Spiel beitreten</Typography>
        <TextField
          variant="outlined"
          color="primary"
          inputProps={{ inputMode: "numeric" }}
          label="vierstelliger Einladungscode"
          value={invitationCode}
          onChange={handleChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
          helperText={helperText}
          error={noGameFound}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!canJoinGame}
          startIcon={<ExitToApp />}
        >
          Beitreten
        </Button>
      </FormWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.main`
  display: grid;
  align-content: start;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  justify-self: center;
  display: grid;
  gap: 1rem;
`;
