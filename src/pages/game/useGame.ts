import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Game } from "../../typing/interface/Game";
import { Firebase } from "../../firebase/Firebase";
import { Path } from "../../typing/enum/Path";

interface Params {
  gameId: string;
}

export const useGame = (): Game | null => {
  const history = useHistory();
  const { gameId } = useParams<Params>();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    // Fisher-Yates shuffle algorithm
    const shuffle = (array: Array<any>) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

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
      setGame({
        ...game,
        buzzwords: shuffle(game.buzzwords),
      });
    };

    fetchGame();
  }, [gameId, history]);

  return game;
};
