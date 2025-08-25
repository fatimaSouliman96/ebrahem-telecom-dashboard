import axios from "axios";
import { baseUrl } from "../constants/baseUrl";

export const login = async (username, password) => {
  const response = await axios.post(`${baseUrl}login`, {
    username,
    password,
  }, {
    headers: {
      Accept: "application/json",
    },
  });

  return response.data;
};
