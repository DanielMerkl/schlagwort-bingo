import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";

import { Firebase } from "../firebase/Firebase";
import { FirebaseUser } from "../typing/type/FirebaseUser";

interface IUserContext {
  user: FirebaseUser | null;
  isLoggedIn: boolean;
}

const UserContext = createContext<IUserContext>({
  user: null,
  isLoggedIn: false,
});

export const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

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
