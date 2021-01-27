import { createContext, FC, useContext, useEffect, useState } from "react";
import initFirebase from "./initFirebase";
import firebase from "firebase/app";
import { useRouter } from "next/router";
import { removeToken, setToken } from "./token";

initFirebase();

interface IAuthContext {
  user: firebase.User | null;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const router = useRouter();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => router.push("/"))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const cancelAuthListner = firebase.auth().onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
        setUser(user);
      } else {
        removeToken();
        setUser(null);
      }
    });
    return () => {
      cancelAuthListner();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
