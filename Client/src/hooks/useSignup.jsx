import { useState } from "react";
import useAuthContext from "./useAuthContext";
import Base_Url from "../config";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoding] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoding(true);
    setError(null);
    // const url = "http://localhost:5000/api/auth/register";

    const response = await fetch(Base_Url+"/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoding(false);
      setError(json.msg);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json.data));

      dispatch({ type: "LOGIN", payload: json.data });
      setIsLoding(false);
    }
  };

  return { signup, isLoading, error };
};
