import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinearProgress, Typography } from "@material-ui/core";
import styled from "styled-components";

import { Firebase } from "../../firebase/Firebase";
import { Game } from "../../typing/interface/Game";

interface Params {
  gameId: string;
}

export const GamePage: FC = () => {
  const { gameId } = useParams<Params>();

  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      const documentSnapshot = await Firebase.firestore()
        .collection("games")
        .doc(gameId)
        .get();

      const game: Game = documentSnapshot.data() as Game;
      console.log("game: ", game);
      setGame(game);
      setIsLoading(false);
    };

    fetchGame();
  }, [gameId]);

  return (
    <Wrapper>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div>
          <Typography>ID des Spiels: {gameId}</Typography>
          <ul>
            {game?.buzzwords.map((buzzword) => (
              <li key={buzzword}>{buzzword}</li>
            ))}
          </ul>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  align-content: start;
`;
