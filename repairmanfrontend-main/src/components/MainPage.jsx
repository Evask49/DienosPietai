import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = ({ onLogout }) => {
  const [repairmen, setRepairmen] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch repairmen ads from the backend
    axios
      .get("http://localhost:8080/repairman")
      .then((response) => setRepairmen(response.data))
      .catch((error) => console.error("Error fetching repairmen:", error));
  }, []);

  const handleAddRepairman = () => {
    navigate("/addrepairman");
  };

  return (
    <div>
      <Header pageTitle="Main Page" onLogout={onLogout} />
      <div className="container mt-5">
        <h2>Repairman Ads</h2>
        <div className="row">
          {repairmen.map((repairman) => (
            <div className="col-md-4" key={repairman._id}>
              <div className="card mb-4">
                <img
                  src={repairman.picture}
                  className="card-img-top"
                  alt={repairman.fname}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {repairman.fname} {repairman.lname}
                  </h5>
                  <p className="card-text">
                    <strong>Specialization:</strong> {repairman.spec}
                  </p>
                  <p className="card-text">
                    <strong>Service Name:</strong> {repairman.shop}
                  </p>
                  <p className="card-text">
                    <strong>City:</strong> {repairman.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-4" onClick={handleAddRepairman}>
          Add Repairman
        </button>
      </div>
    </div>
  );
};

export default MainPage;
