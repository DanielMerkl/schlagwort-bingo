import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase";

import { Firebase } from "../firebase/Firebase";

interface IUserContext {
  user: firebase.User | null;
  isLoggedIn: boolean;
}

const UserContext = createContext<IUserContext>({
  user: null,
  isLoggedIn: false,
});

export const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    async function loginAnonymously() {
      const userCredential = await Firebase.auth().signInAnonymously();
      setUser(userCredential.user);
    }

    loginAnonymously();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn: user !== null }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
