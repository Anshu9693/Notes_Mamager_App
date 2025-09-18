import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./pages/user/user.login.jsx";
import UserRegister from "./pages/user/user.register.jsx";
import NotePage from "./pages/note";
import ProtectedRoute from "./prtotectedroute.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />

        <Route
          path="/note"
          element={
            <ProtectedRoute>
              <NotePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
