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
  const newGame: Game = {
    id: invitationCode,
    buzzwords,
    createdAt: new Date(),
  };
  await Firebase.firestore()
    .collection("games")
    .doc(invitationCode.toString())
    .set(newGame);

  return newGame;
};

export const Api = {
  createGame: createGame,
};
