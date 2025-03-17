import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate, Routes, Route } from "react-router-dom";

const Prodlist = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/dashboard/prodlist/psr">PSR</Link> {/* Use Link for client-side navigation */}
        <Link to="/dashboard/prodlist/output">Daily Output</Link>
        <Link to="">Shipment</Link>
        <Link to="">Capacity</Link>
        <Link to="">Overtime</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Prodlist;


