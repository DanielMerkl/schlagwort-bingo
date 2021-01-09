import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { LinearProgress, Typography } from "@material-ui/core";
import styled from "styled-components";

import { Firebase } from "../../firebase/Firebase";
import { Game } from "../../typing/interface/Game";
import { Path } from "../../typing/enum/Path";

interface Params {
  gameId: string;
}

export const GamePage: FC = () => {
  const { gameId } = useParams<Params>();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      const documentSnapshot = await Firebase.firestore()
        .collection("games")
        .doc(gameId)
        .get();

      if (!documentSnapshot.exists) {
        history.push(Path.Game + "/not-found");
        return;
      }

      const game: Game = documentSnapshot.data() as Game;
      console.log("game: ", game);
      setGame(game);
      setIsLoading(false);
    };

    fetchGame();
  }, [gameId, history]);

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
