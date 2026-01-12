import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { FiArrowRight, FiAlertCircle } from "react-icons/fi";

const Login = ({ setCurrentPage, onSwitch, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setLoading(true);

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        onSuccess?.();
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[400px] p-8 flex flex-col justify-center">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
        <p className="text-sm text-gray-600 mt-2">
          Login to your account to continue
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button 
          type="submit" 
          className="btn-primary flex items-center justify-center gap-2 mt-6"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
          <FiArrowRight className={loading ? "opacity-50" : ""} />
        </button>

        <div className="pt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            onClick={onSwitch}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
