import React, { useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddRepairMan = () => {
  const [repairMan, setRepairMan] = useState({
    fname: '',
    lname: '',
    spec: '',
    picture: '',
    shop: '',
    city: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setRepairMan({
      ...repairMan,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }
      const response = await axios.post("http://localhost:8080/repairman", repairMan, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Repairman added:', response.data);
      setRepairMan({ fname: '', fname: '', spec: '', picture: '', shop: '', city: '' });
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data.message : "Error adding repairman");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Add New Repairman</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formFirstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="formFirstName"
                placeholder="Enter first name"
                name="fname"
                value={repairMan.fname}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formLastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="formLastName"
                placeholder="Enter last name"
                name="lname"
                value={repairMan.lname}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formSpecialization" className="form-label">Specialization</label>
              <input
                type="text"
                className="form-control"
                id="formSpecialization"
                placeholder="Enter specialization"
                name="spec"
                value={repairMan.spec}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formServiceName" className="form-label">Service Name</label>
              <input
                type="text"
                className="form-control"
                id="formServiceName"
                placeholder="Enter service name"
                name="shop"
                value={repairMan.shop}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formCity" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="formCity"
                placeholder="Enter city"
                name="city"
                value={repairMan.city}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formImage" className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                id="formImage"
                placeholder="Enter image URL"
                name="picture"
                value={repairMan.picture}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Add Repairman</button>
            {error && <div className="mt-3 alert alert-danger" role="alert">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRepairMan;
