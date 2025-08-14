import { useState } from "react";
import { registerUserRoute } from "../../utils/apiRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(registerUserRoute,
        formData, {
          withCredentials: true
        }
      )
      localStorage.setItem('token', res.data.data.token)
      toast.success("User registered successfully")
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong !!")
    }

    console.log(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-800">
          Create Your MindTrack Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 pr-10 focus:border-purple-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-purple-500 px-4 py-2 font-medium text-white hover:bg-purple-600"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-purple-500 hover:underline"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
