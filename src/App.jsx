import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
