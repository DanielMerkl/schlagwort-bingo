import React, { FC, useState } from "react";
import { Button, Step, StepButton, Stepper } from "@material-ui/core";
import styled from "styled-components";

import { GameSizeStep } from "./GameSizeStep";
import { AddBuzzwordsStep } from "./AddBuzzwordsStep";
import { useSnackbar } from "../../context/SnackbarContext";
import { ShareLinkStep } from "./ShareLinkStep";

export const CreateGamePage: FC = () => {
  const { showError } = useSnackbar();

  const [activeStep, setActiveStep] = useState(0);
  const [gameSize, setGameSize] = useState(9);
  const [buzzwords, setBuzzwords] = useState<Array<string>>([]);
  const [firstStepCompleted, setFirstStepCompleted] = useState(false);
  const [secondStepCompleted, setSecondStepCompleted] = useState(false);

  const handleNextClick = () => {
    if (activeStep === 1 && buzzwords.length !== gameSize) {
      const fewOrMany = buzzwords.length < gameSize ? "wenige" : "viele";
      showError(`Zu ${fewOrMany} Schlagwörter ausgewählt.`);
      return;
    }

    if (activeStep === 0 && !firstStepCompleted) {
      setFirstStepCompleted(true);
    }
    if (activeStep === 1 && !secondStepCompleted) {
      setSecondStepCompleted(true);
    }
    setActiveStep((prevState) => prevState + 1);
  };

  return (
    <PageWrapper>
      <Stepper alternativeLabel activeStep={activeStep}>
        <Step completed={firstStepCompleted}>
          <StepButton onClick={() => setActiveStep(0)}>
            Größe des Spiels festlegen
          </StepButton>
        </Step>
        <Step>
          <StepButton onClick={() => setActiveStep(1)}>
            Schlagwörter hinzufügen ({buzzwords.length}/{gameSize})
          </StepButton>
        </Step>
        <Step>
          <StepButton onClick={() => setActiveStep(2)}>
            Link für Mitspieler speichern
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
      {activeStep === 2 && <ShareLinkStep />}
      <Pagination>
        <Button
          variant="outlined"
          onClick={() => setActiveStep((prevState) => prevState - 1)}
          disabled={activeStep === 0}
        >
          Zurück
        </Button>
        {activeStep === 2 ? (
          <Button variant="contained" color="primary">
            Spiel starten
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNextClick}>
            Weiter
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
