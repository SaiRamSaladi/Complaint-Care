import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      const user = res.data.user;

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful");

      // 🔥 Role Based Redirect
      if (user.userType === "admin") {
  navigate("/admin");
} else if (user.userType === "agent") {
  navigate("/agent");
} else {
  navigate("/dashboard");
}


    } catch (error) {
      alert("Login Failed");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>

      <form onSubmit={handleLogin} className="col-md-4 mx-auto mt-4">
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
