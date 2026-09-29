import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import background from "../assets/background.jpg";

function Landing() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (isAuthenticated) return <Navigate to="/home" replace />;

  return (
    <div
      className="text-white h-[100vh] flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative text-center w-80">
        <h1 className="text-4xl font-bold mb-2">USocial</h1>
        <p className="text-slate-300 text-sm mb-8">
          Connect with your friends and share your moments
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to="/login"
            className="w-full text-[18px] rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="w-full text-[18px] rounded-full border border-white text-white hover:bg-white hover:text-emerald-800 py-2 transition-colors duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
