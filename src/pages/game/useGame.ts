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
      setGame(game);
    };

    fetchGame();
  }, [gameId, history]);

  return game;
};
