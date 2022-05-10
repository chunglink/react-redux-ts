import * as dataTypes from "../types";
import http from "@/services/httpService";

export const login = async (userdetail: dataTypes.LoginDetails) => {
  let result = await http.post("/api/Users/authenticate", userdetail);
  return result.data;
};
export const getUsers = async () => {
  let result = await http.get("/api/Users");
  return result.data;
};
