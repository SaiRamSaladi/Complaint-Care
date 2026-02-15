import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserDashboard() {

  const navigate = useNavigate();

  // Get logged in user
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Protect Dashboard
  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    }
  }, [storedUser, navigate]);

  const [formData, setFormData] = useState({
    userId: storedUser ? storedUser._id : "",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: ""
  });

  const [complaints, setComplaints] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/complaints/user/${formData.userId}`
      );
      setComplaints(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/complaints/create", {
        ...formData,
        status: "Pending"
      });

      alert("Complaint Submitted Successfully");

      fetchComplaints();

      setFormData({
        ...formData,
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        description: ""
      });

    } catch (error) {
      alert("Error submitting complaint");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center">
        <h2>User Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="col-md-6 mx-auto mt-4">

        <input
          type="text"
          name="name"
          value={formData.name}
          className="form-control mb-3"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          className="form-control mb-3"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          className="form-control mb-3"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          value={formData.state}
          className="form-control mb-3"
          placeholder="State"
          onChange={handleChange}
        />

        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          className="form-control mb-3"
          placeholder="Pincode"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          className="form-control mb-3"
          placeholder="Complaint Description"
          onChange={handleChange}
          required
        ></textarea>

        <button className="btn btn-primary w-100">
          Submit Complaint
        </button>
      </form>

      <hr />

      <h4>Your Complaints</h4>

      <button
        className="btn btn-secondary mb-3"
        onClick={fetchComplaints}
      >
        Load My Complaints
      </button>

      {complaints.length === 0 && <p>No complaints found.</p>}

      {complaints.map((comp) => (
        <div key={comp._id} className="card p-3 mb-3">
          <h5>{comp.name}</h5>
          <p>{comp.description}</p>
          <p>Status: <b>{comp.status}</b></p>
        </div>
      ))}

    </div>
  );
}

export default UserDashboard;
