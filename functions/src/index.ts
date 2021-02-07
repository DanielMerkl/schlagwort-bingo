import * as firebaseFunctions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const functions = firebaseFunctions.region("europe-west3");

export const generateInvitationCode = functions.https.onCall(async () => {
  const games = await admin.firestore().collection("games").get();
  const gameIds: Array<number> = games.docs.map((game) => Number(game.id));

  const min = 1000;
  const max = 9999;

  while (true) {
    const generatedCode = Math.floor(Math.random() * (max - min)) + min;
    if (!gameIds.includes(generatedCode)) {
      return generatedCode;
    }
  }
});

/**
 * This database triggered function will check for games that are older than one
 * day. Each game needs to have a `createdAt` attribute.
 * see: https://github.com/firebase/functions-samples/tree/master/delete-old-child-nodes
 */
export const deleteOldGames = functions.firestore
  .document("/games/{gameId}")
  .onCreate(async (createdGame) => {
    const yesterday: Date = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const gamesCollectionReference = createdGame.ref.parent;
    const oldGames = await gamesCollectionReference
      .where("createdAt", "<", yesterday)
      .get();
    oldGames.forEach((oldGame) => oldGame.ref.delete());
  });

/**
 * This database triggered function will set the winner of a game to null in
 * order to save the winner for only a small period of time. This prevents other
 * players connecting to a game to receive a winner-notification right after
 * joining.
 */
export const resetWinner = functions.firestore
  .document("/games/{gameId}")
  .onUpdate((updatedGame) => {
    updatedGame.after.ref.update({ winner: null });
  });
