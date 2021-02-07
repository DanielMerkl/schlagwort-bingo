import React, { FC, useState } from "react";
import { Button, Fab, TextField } from "@material-ui/core";
import styled from "styled-components";

import { HorizontalLoadingIndicator } from "../../components/HorizontalLoadingIndicator";
import { checkBingo } from "./checkBingo";
import { useGame } from "./useGame";
import { calculateGameStyles } from "./calculateGameStyles";

export const GamePage: FC = () => {
  const game = useGame();
  const gameStyles = calculateGameStyles(game);

  const [username, setUsername] = useState("");
  const [selectedBuzzwords, setSelectedBuzzwords] = useState<Array<string>>([]);

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
    // TODO: cloud messaging triggern mit aktuellem Usernamen und Game-ID
  }

  return (
    <PageWrapper>
      <HorizontalLoadingIndicator isLoading={game === null} />
      <TextField
        variant="outlined"
        color="primary"
        label="Spielername"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      {game && (
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
      )}
      <div />
      <Fab
        variant="extended"
        color="primary"
        disabled={!isBingo}
        onClick={handleBingoClick}
      >
        Bingo
      </Fab>
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
