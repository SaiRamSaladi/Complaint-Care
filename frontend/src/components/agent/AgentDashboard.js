import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AgentDashboard() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (!storedUser || storedUser.userType !== "agent") {
      navigate("/login");
    } else {
      fetchAssignedComplaints();
    }
  }, []);

  const fetchAssignedComplaints = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/agent/${storedUser._id}`
    );
    setComplaints(res.data);
  } catch (error) {
    console.error(error);
  }
};


  

  const updateStatus = async (complaintId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8000/api/agent/update/${complaintId}`,
        { status: newStatus }
      );

      alert("Status Updated Successfully");
      fetchAssignedComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-danger float-end" onClick={handleLogout}>
        Logout
      </button>

      <h2>Agent Dashboard</h2>

      <h4 className="mt-4">Assigned Complaints</h4>

      {complaints.length === 0 && <p>No complaints assigned yet.</p>}

      {complaints.map((comp) => (
        <div key={comp._id} className="card p-3 mb-3">
          <h5>{comp.name}</h5>
          <p>{comp.description}</p>
          <p>Status: <b>{comp.status}</b></p>

          <select
            className="form-select"
            onChange={(e) => updateStatus(comp._id, e.target.value)}
          >
            <option value="">Update Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AgentDashboard;
