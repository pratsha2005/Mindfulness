import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import Dashboard from './pages/entry/Dashboard'
import AddEntry from './pages/entry/AddEntry'
import AnalysisPage from './pages/entry/Analysis'

function App() {
  
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
    
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-entry"
          element={isAuthenticated ? <AddEntry /> : <Navigate to="/login" />}
        />
        <Route
          path="/analysis"
          element={isAuthenticated ? <AnalysisPage /> : <Navigate to="/login" />}
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    <ToastContainer
        position="top-right"
        autoClose={3000} // close after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName={() =>
          "w-80 h-16 flex items-center bg-purple-600 text-white font-medium rounded-lg shadow-lg"
        }
         bodyClassName="text-base"
        progressClassName="bg-purple-300"
      />
    </>
  );
}

export default App
