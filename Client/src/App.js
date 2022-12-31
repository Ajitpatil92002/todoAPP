import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import useAuthContext from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={user ? <Home /> : <Navigate to={"/login"} />} />
        <Route
          path="login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="signup"
          element={!user ? <SignUp /> : <Navigate to={"/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
