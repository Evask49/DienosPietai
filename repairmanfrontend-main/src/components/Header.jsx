import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ pageTitle, onLogout }) => {
  const userName = localStorage.getItem("userName"); // Assuming userName is stored in localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand mb-0 h1">{userName}</span>
      <span className="navbar-text">{pageTitle}</span>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;
