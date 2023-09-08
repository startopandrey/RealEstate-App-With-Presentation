import axios from "axios";
import firebase from "firebase";
import { serverUrl } from "../../utils/env";

export const loginRequest = async (email, password) => {
  return axios.post(`${serverUrl}/user/login`, {
    email,
    password,
  });
};
export const registerRequest = async (
  email,
  password,
  userLocation,
  username
) => {
  return axios.post(`${serverUrl}/user/register`, {
    email,
    password,
    userLocation,
    username,
  });
};
