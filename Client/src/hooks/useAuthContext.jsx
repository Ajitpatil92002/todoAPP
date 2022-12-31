import { useContext } from "react";
import { AuthContext } from "../context/authContext/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must br used inside an AuthContextProvider");
  }

  return context;
};

export default useAuthContext;
