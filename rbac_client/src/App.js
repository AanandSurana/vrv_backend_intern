import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AdminPage from './components/pages/AdminPage';
import UserPage from './components/pages/UserPage';
import UnauthorizedPage from './components/pages/UnauthorizedPage';
import ProtectedRoute from './components/ProtectedRoute';
import SignUpForm from './components/SignUpForm';
import DummyPage from './components/pages/Moderator';
import axios from 'axios';
import Cookies from 'js-cookie';

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    role: null,
    token: null,
    loading: true, // Added a loading state
  });

  useEffect(() => {
    const token = Cookies.get('token'); // Get token from cookies

    if (token) {
      // Verify the token with the backend
      axios
        .get('http://localhost:5000/api/verifyToken', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const { role } = response.data; // Assuming response includes user role
          setAuthState({
            isAuthenticated: true,
            role,
            token,
            loading: false,
          });
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
          Cookies.remove('token'); // Clear invalid token
          setAuthState({
            isAuthenticated: false,
            role: null,
            token: null,
            loading: false,
          });
        });
    } else {
      setAuthState({
        isAuthenticated: false,
        role: null,
        token: null,
        loading: false,
      });
    }
  }, []);

  if (authState.loading) {
    return <div>Loading...</div>; // Display a loading spinner or message
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setAuthState={setAuthState} />} />
        <Route path="/login" element={<LoginForm setAuthState={setAuthState} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              component={AdminPage}
              isAuthenticated={authState.isAuthenticated}
              allowedRoles={['admin']}
              userRole={authState.role}
            />
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute
              component={UserPage}
              isAuthenticated={authState.isAuthenticated}
              allowedRoles={['user', 'admin','moderator']}
              userRole={authState.role}
            />
          }
        />
        <Route
          path="/moderator"
          element={
            <ProtectedRoute
              component={DummyPage}
              isAuthenticated={authState.isAuthenticated}
              allowedRoles={['admin','moderator']}
              userRole={authState.role}
            />
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}

export default App;

