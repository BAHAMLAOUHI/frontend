import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import AuthenticatePage from './components/AuthenticatePage'; 
import RegisterPage from './components/RegisterPage'; 
import Dashboard from "./components/Dashboard"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Test from "./components/Test";


function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticatePage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
} 

export default App; 
