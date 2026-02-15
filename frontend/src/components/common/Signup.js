import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    userType: "user"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", formData);
      alert("Registration Successful");
      console.log(res.data);
    } catch (error) {
      alert("Registration Failed");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>

      <form onSubmit={handleSignup} className="col-md-4 mx-auto mt-4">
        <input
          type="text"
          name="name"
          className="form-control mb-3"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          className="form-control mb-3"
          placeholder="Phone"
          onChange={handleChange}
        />

        <select
          name="userType"
          className="form-control mb-3"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
