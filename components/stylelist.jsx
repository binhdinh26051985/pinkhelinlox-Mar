
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Stylelist = () => {
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true
  
  
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-10">
            <p> <strong> Product Review </strong></p>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu">
              <li className="w-100">
                <Link
                  to="/dashboard/Detailstyle"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="bi bi-box"></i>
                  <span className="ms-2 d-none d-sm-inline"> Product List</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/Colorlist"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="bi bi-palette"></i>
                  <span className="ms-2 d-none d-sm-inline"> Color List</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/prodgen"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="bi bi-play"></i>
                  <span className="ms-2 d-none d-sm-inline">Generator</span>
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
                <h1>Product Review</h1>
            </div>
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Stylelist;