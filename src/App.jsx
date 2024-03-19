import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SignUp from "./components/SignUp";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }

    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <AuthProvider token={token} user={user}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login addToken={setToken} addUser={setUser} />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
    </AuthProvider>
  );
};

export default App;
