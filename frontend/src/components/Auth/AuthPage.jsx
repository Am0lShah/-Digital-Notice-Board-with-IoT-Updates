import React, { useState } from "react";
import axios, { formToJSON } from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    // avatar: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
      ? import.meta.env.VITE_REGISTER_USER
      : import.meta.env.VITE_LOGIN_USER;

    try {
      let payload;

      if (isSignUp) {
        payload = new FormData();
        payload.append("fullName", formData.fullName);
        payload.append("username", formData.username);
        payload.append("email", formData.email);
        payload.append("password", formData.password);
        // if (formData.avatar) {
        //   payload.append("avatar", formData.avatar);
        // }
      } else {
        payload = {
          email: formData.email,
          password: formData.password,
        };
      }

      console.log(formData.avatar);
      
      const response = await axios.post(url, payload, {
        headers: {
            //  "Content-Type": isSignUp ? "multipart/form-data" : "application/json",
          "Content-Type": isSignUp ? "application/json" : "application/json",
        },
      });

      if (response.status === 200) {
        dispatch(setUser(response.data.User));
        localStorage.setItem("token", response.data.accessToken);
        alert(response.data.message || "Success!");
      }
      if(response.status===201){
        alert(response.data.message || "Success Register!");
        window.location.reload();
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert(
          `User already exists with username ${formData.username} and email ${formData.email}`
        );
      } else {
        alert(error.response?.data?.message || "Something went wrong!");
      }
      console.error("Error:", error.response?.data || error.message);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Avatar</label>
                  <input
                    type="file"
                    name="avatar"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div> */}
              </>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span
              className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="image4.jpg"
          alt="Auth Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);
};

export default AuthPage;
