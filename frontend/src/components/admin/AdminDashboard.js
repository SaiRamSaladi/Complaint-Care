import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchComplaints();
    fetchAgents();
  }, []);

  const fetchComplaints = async () => {
    const res = await axios.get("http://localhost:8000/api/admin/complaints");
    setComplaints(res.data);
  };

  const fetchAgents = async () => {
    const res = await axios.get("http://localhost:8000/api/admin/agents");
    setAgents(res.data);
  };

  const assignAgent = async (complaintId, agentId) => {
    await axios.put(`http://localhost:8000/api/admin/assign/${complaintId}`, {
      agentId,
    });

    alert("Agent Assigned Successfully");
    fetchComplaints();
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

      <h2>Admin Dashboard</h2>

      <h4 className="mt-4">All Complaints</h4>

      {complaints.map((comp) => (
        <div key={comp._id} className="card p-3 mb-3">
          <h5>{comp.name}</h5>
          <p>{comp.description}</p>
          <p>Status: <b>{comp.status}</b></p>

          <select
            className="form-select"
            onChange={(e) => assignAgent(comp._id, e.target.value)}
          >
            <option value="">Assign to Agent</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
