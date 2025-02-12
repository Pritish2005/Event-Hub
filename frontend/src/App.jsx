import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import MyEvents from "./pages/MyEvents";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-events"
            element={
              <ProtectedRoute>
                <MyEvents />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
