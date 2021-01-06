import firebase from "firebase";

import { Firebase } from "../firebase/Firebase";
import { Game } from "../typing/interface/Game";

const FirebaseFunctions = Firebase.functions("europe-west3");

const generateInvitationCode = async (): Promise<number> => {
  const callable = FirebaseFunctions.httpsCallable("generateInvitationCode");
  const result = await callable();

  return result.data;
};

const createGame = async (buzzwords: Array<string>): Promise<Game> => {
  const invitationCode = await generateInvitationCode();
  await Firebase.firestore()
    .collection("games")
    .doc(invitationCode.toString())
    .set({
      buzzwords,
      createdAt: firebase.firestore.Timestamp.now(),
    });

  return { invitationCode, buzzwords };
};

export const Api = {
  createGame: createGame,
};
