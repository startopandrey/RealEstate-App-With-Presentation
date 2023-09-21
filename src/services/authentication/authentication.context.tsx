import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase";
import { loginRequest, registerRequest } from "./authentication.service";
import { Location } from "src/types/apartments/apartment";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthenticationContextType {
  isAuthenticated?: boolean;
  user?: firebase.UserInfo | undefined | null;
  isLoading: boolean;
  error: string | null;
  onLogin: (email: string, password: string) => void;
  onRegister: (
    email: string,
    password: string,
    userLocation: Location,
    username: string
  ) => void;

  onLogout: () => void;
}
export const AuthenticationContext =
  createContext<AuthenticationContextType | null>(null);

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<firebase.User | null>();
  const [error, setError] = useState<string | null>(null);

  const saveUserToStorage = async (user) => {
    const userJson = JSON.stringify(user);
    await AsyncStorage.setItem("@user", userJson);
  };

  useEffect(() => {
    const getUserFromStorage = async () => {
      const userFromStorage = await AsyncStorage.getItem("@user");
      if (userFromStorage) {
        return setUser(JSON.parse(userFromStorage));
      }
    };
    getUserFromStorage();
  }, []);

  const onLogin = (email, password) => {
    setIsLoading(true);
    setTimeout(() => {
      loginRequest(email, password)
        .then((data) => {
          const user = data.data.data;

          if (user && user._id) {
            saveUserToStorage(user);
            setUser(user);
          }

          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
          setError(e.toString());
        });
    }, 1000);
  };

  const onRegister = (email, password, userLocation, username) => {
    setIsLoading(true);
    setTimeout(() => {
      registerRequest(email, password, userLocation, username)
        .then((data) => {
          const user = data.data.data;
          if (user && user._id) {
            saveUserToStorage(user);
            setUser(user);
          }

          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          setError(e.toString());
        });
    }, 1000);
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem("@user-location");
    await AsyncStorage.removeItem("@user");
    setUser(null);
    setError(null);
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
