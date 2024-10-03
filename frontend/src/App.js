import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import LayoutWithHeader from "./LayoutwithHeader"; 
import Notify from "./components/Notify";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage onLogin={handleLogin} />} />

        <Route element={<LayoutWithHeader onLogout={handleLogout} />}> {/* Passing onLogout here */}
          <Route
            path="/home"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
          />
           <Route
            path="/notifications"
            element={isAuthenticated ? <Notify /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
