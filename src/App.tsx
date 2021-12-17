import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/common/PrivateRoute";
import { AdminLayout } from "./components/layout/AdminLayout";
import AuthPage from "./features/Auth/pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute redirectTo="/login">
              <AdminLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
