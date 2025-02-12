import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
    const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Login Required</h2>
          <p className="mb-4">You need to log in to access this page.</p>
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
