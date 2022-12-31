import { useState } from "react";
import useAuthContext from "./useAuthContext";
import Base_Url from "../config";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoding] = useState(null);
  const { dispatch } = useAuthContext();
  // const url = "http://localhost:5000/api/auth/login";

  const login = async (email, password) => {
    setIsLoding(true);
    setError(null);
    const response = await fetch(Base_Url+"/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoding(false);
      setError(json.msg);
    }
    if (response.ok) {
      console.log(json);
      localStorage.setItem("user", JSON.stringify(json.data));

      dispatch({ type: "LOGIN", payload: json.data });
      setIsLoding(false);
    }
  };

  return { login, isLoading, error };
};
