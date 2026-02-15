import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e293b, #0f172a)", color: "white" }}>
      
      {/* Navbar */}
      <nav className="navbar navbar-dark px-5 py-3">
        <span className="navbar-brand fw-bold fs-4">ComplaintCare</span>
        <div className="ms-auto">
          <button
            className="btn btn-outline-light me-3"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: "80vh" }}>
          
          {/* Left Content */}
          <div className="col-md-6">
            <h1 className="display-4 fw-bold">
              Smart Complaint
              <span style={{ color: "#3b82f6" }}> Management System</span>
            </h1>

            <p className="mt-4 fs-5 text-light">
              Simplify issue tracking, assign tasks efficiently,
              and improve customer satisfaction with a modern,
              role-based complaint management platform.
            </p>

            <button
              className="btn btn-primary btn-lg mt-4 px-4"
              onClick={() => navigate("/signup")}
            >
              Register Your Complaint
            </button>
          </div>

          {/* Right Image */}
          <div className="col-md-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
              alt="Support"
              style={{ width: "80%" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
