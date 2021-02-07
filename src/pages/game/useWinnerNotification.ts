import { useEffect, useState } from "react";

import { Game } from "../../typing/interface/Game";
import { Firebase } from "../../firebase/Firebase";
import { useSnackbar } from "../../context/SnackbarContext";

export const useWinnerNotification = (game: Game | null, username: string) => {
  const { showInfo } = useSnackbar();
  const [debouncedUsername, setDebouncedUsername] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedUsername(username);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  useEffect(() => {
    if (game === null) return;

    return Firebase.firestore()
      .collection("games")
      .doc(game.id.toString())
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const { winner }: Game = snapshot.data() as Game;
          if (winner !== null && winner !== debouncedUsername) {
            showInfo(winner + " hat ein BINGO!");
          }
        }
      });
  }, [game, showInfo, debouncedUsername]);
};
