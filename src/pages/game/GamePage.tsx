import React, { FC, useState } from "react";
import { Button, Fab, TextField } from "@material-ui/core";
import styled from "styled-components";

import { HorizontalLoadingIndicator } from "../../components/HorizontalLoadingIndicator";
import { checkBingo } from "./checkBingo";
import { useGame } from "./useGame";
import { calculateGameStyles } from "./calculateGameStyles";
import { useWinnerNotification } from "./useWinnerNotification";
import { Firebase } from "../../firebase/Firebase";
import { useSnackbar } from "../../context/SnackbarContext";
import { useMobileScreen } from "../../utils/hooks/useMobileScreen";

export const GamePage: FC = () => {
  const isMobileScreen = useMobileScreen();
  const { showError, showSuccess } = useSnackbar();
  const game = useGame();
  const gameStyles = calculateGameStyles(game);

  const [username, setUsername] = useState("");
  const [selectedBuzzwords, setSelectedBuzzwords] = useState<Array<string>>([]);
  const [hasClickedBingo, setHasClickedBingo] = useState(false);

  useWinnerNotification(game, username);

  const isBingo: boolean = checkBingo(game?.buzzwords, selectedBuzzwords);

  const handleBuzzwordClick = (clickedBuzzword: string) => {
    if (selectedBuzzwords.includes(clickedBuzzword)) {
      setSelectedBuzzwords((prevSelectedBuzzwords) =>
        prevSelectedBuzzwords.filter(
          (selectedBuzzword) => selectedBuzzword !== clickedBuzzword
        )
      );
    } else {
      setSelectedBuzzwords((prevSelectedBuzzwords) => [
        ...prevSelectedBuzzwords,
        clickedBuzzword,
      ]);
    }
  };

  async function handleBingoClick() {
    if (game === null) return;

    if (username === "") {
      showError("Bitte gib noch einen Benutzernamen an!");
      return;
    }

    await Firebase.firestore()
      .collection("games")
      .doc(game.id.toString())
      .update({ winner: username });
    setHasClickedBingo(true);
    showSuccess("Mitspieler wurden benachrichtigt!");
  }

  return (
    <PageWrapper
      style={{
        alignSelf: !isMobileScreen ? "start" : "initial",
      }}
    >
      <HorizontalLoadingIndicator isLoading={game === null} />
      {game && (
        <>
          <TextField
            variant="outlined"
            color="primary"
            label="Spielername"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <div style={gameStyles}>
            {game.buzzwords.map((buzzword) => {
              const isSelected = selectedBuzzwords.includes(buzzword);
              return (
                <Button
                  key={buzzword}
                  onClick={() => handleBuzzwordClick(buzzword)}
                  variant={isSelected ? "contained" : "outlined"}
                  color={isSelected ? "primary" : "default"}
                  style={{
                    hyphens: "auto",
                    fontSize: "small",
                    padding: "1px",
                    overflowY: "auto",
                  }}
                >
                  {buzzword}
                </Button>
              );
            })}
          </div>
          <div />
          <Fab
            variant="extended"
            color="primary"
            disabled={!isBingo || hasClickedBingo}
            onClick={handleBingoClick}
          >
            Bingo
          </Fab>
        </>
      )}
    </PageWrapper>
  );
};

const PageWrapper = styled.main`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  width: 100%;
  justify-self: center;
  max-width: 500px;
  grid-template-rows: auto auto auto 1fr auto;
`;
