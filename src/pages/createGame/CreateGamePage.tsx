import React, { FC, useState } from "react";
import { Button, Step, StepButton, Stepper } from "@material-ui/core";
import styled from "styled-components";

import { GameSizeStep } from "./GameSizeStep";
import { AddBuzzwordsStep } from "./AddBuzzwordsStep";
import { useSnackbar } from "../../context/SnackbarContext";
import { ShareInvitationCodeStep } from "./ShareInvitationCodeStep";
import { Api } from "../../utils/Api";
import { LoadingButton } from "../../components/LoadingButton";

export const CreateGamePage: FC = () => {
  const { showError, showSuccess } = useSnackbar();

  const [activeStep, setActiveStep] = useState(0);
  const [gameSize, setGameSize] = useState(9);
  const [buzzwords, setBuzzwords] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [invitationCode, setInvitationCode] = useState<number | null>(null);

  const gameWasCreated: boolean = invitationCode !== null;

  const handleCreateGameClick = async () => {
    if (buzzwords.length !== gameSize) {
      const fewOrMany = buzzwords.length < gameSize ? "wenige" : "viele";
      showError(`Zu ${fewOrMany} Schlagwörter ausgewählt.`);
      return;
    }

    setIsLoading(true);
    try {
      const game = await Api.createGame(buzzwords);
      setInvitationCode(game.invitationCode);
      setActiveStep((prevState) => prevState + 1);
      showSuccess("Spiel erfolgreich erstellt");
    } catch (e) {
      showError("Fehler beim Erstellen des Spiels.");
    }
    setIsLoading(false);
  };

  const handleStartGameClick = () => {
    // TODO: implement
  };

  return (
    <PageWrapper>
      <Stepper alternativeLabel activeStep={activeStep}>
        <Step disabled={gameWasCreated}>
          <StepButton onClick={() => setActiveStep(0)}>
            Größe des Spiels festlegen
          </StepButton>
        </Step>
        <Step disabled={gameWasCreated}>
          <StepButton onClick={() => setActiveStep(1)}>
            Schlagwörter hinzufügen ({buzzwords.length}/{gameSize})
          </StepButton>
        </Step>
        <Step>
          <StepButton onClick={() => setActiveStep(2)}>
            Mitspieler einladen
          </StepButton>
        </Step>
      </Stepper>
      {activeStep === 0 && (
        <GameSizeStep gameSize={gameSize} setGameSize={setGameSize} />
      )}
      {activeStep === 1 && (
        <AddBuzzwordsStep
          buzzwords={buzzwords}
          setBuzzwords={setBuzzwords}
          gameSize={gameSize}
        />
      )}
      {activeStep === 2 && (
        <ShareInvitationCodeStep invitationCode={invitationCode} />
      )}
      <Pagination>
        <Button
          variant="outlined"
          onClick={() => setActiveStep((prevState) => prevState - 1)}
          disabled={activeStep === 0 || activeStep === 2}
        >
          Zurück
        </Button>
        {activeStep === 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveStep((prevState) => prevState + 1)}
          >
            Weiter
          </Button>
        )}
        {activeStep === 1 && (
          <LoadingButton isLoading={isLoading} onClick={handleCreateGameClick}>
            Spiel erstellen
          </LoadingButton>
        )}
        {activeStep === 2 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartGameClick}
          >
            Spiel starten
          </Button>
        )}
      </Pagination>
    </PageWrapper>
  );
};

const PageWrapper = styled.main`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const Pagination = styled.div`
  max-width: 500px;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  align-self: end;
  grid-template-columns: 1fr 1fr;
  justify-self: center;
  width: 100%;
`;
