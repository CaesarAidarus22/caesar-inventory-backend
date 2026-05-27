import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await api.post(
        "/auth/login",
        formData
      );

    localStorage.setItem(
    "token",
    response.data.data.token
    );

    localStorage.setItem(
    "user",
    JSON.stringify(response.data.data.user)
    );

      navigate("/admin/products");

    } catch (error) {

      console.log(error);

      alert("Login failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-800">
            Caesar Inventory
          </h1>

          <p className="text-slate-500 mt-2">
            Admin Login
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition"
          >

            {loading ? "Loading..." : "Login"}

          </button>

        </form>

        <p className="text-center text-sm text-slate-500 mt-6">

        Don't have an account?{" "}

        <Link
            to="/register"
            className="text-blue-500 hover:underline"
        >
            Register
        </Link>

        </p>

      </div>

    </div>

  );

};

export default Login;