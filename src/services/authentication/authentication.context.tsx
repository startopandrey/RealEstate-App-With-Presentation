import React, { useState, createContext } from "react";
import firebase from "firebase";
import { loginRequest } from "./authentication.service";

interface AuthenticationContextType {
  isAuthenticated?: boolean;
  user?: firebase.UserInfo | undefined | null;
  isLoading: boolean;
  error: string | null;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string, repeatedPassword: string) => void;
  onLogout: () => void;
}
export const AuthenticationContext = createContext<AuthenticationContextType>({});

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<firebase.User | null>();
  const [error, setError] = useState<string | null>(null);

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e: string) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u: firebase.auth.UserCredential) => {
        if (!u) {
          setUser(u);
        }

        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
