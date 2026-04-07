import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/shared/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Discover from './pages/Discover';
import RecipeDetail from './pages/RecipeDetail';
import PostRecipe from './pages/PostRecipe';
import Chat from './pages/Chat';
import TopChefs from './pages/TopChefs';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import FoodieDashboard from './pages/FoodieDashboard';
import ChefDashboard from './pages/ChefDashboard';
import Unauthorized from './pages/Unauthorized';
import Community from './pages/Community';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recipes" element={<Discover />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/top-chefs" element={<TopChefs />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard/foodie"
                element={
                  <ProtectedRoute>
                    <FoodieDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/chef"
                element={
                  <ProtectedRoute allowedRoles={["CHEF", "ADMIN"]}>
                    <ChefDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post-recipe"
                element={
                  <ProtectedRoute allowedRoles={["CHEF", "ADMIN"]}>
                    <PostRecipe />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/community"
                element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN"]}>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff'
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff'
                  }
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff'
                  }
                }
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
