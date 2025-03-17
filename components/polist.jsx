import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const POlist = () => {
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true
  
  
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-10">
            <p> <strong> Order Review </strong></p>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu">
              <li className="w-100">
                <Link
                  to="/dashboard/dest"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="bi bi-geo-alt"></i>
                  <span className="ms-2 d-none d-sm-inline"> Destination</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/viewpo"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="bi bi-file-earmark-check"></i>
                  <span className="ms-2 d-none d-sm-inline"> Customer PO</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/viewpo"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="bi bi-boxes"></i>
                  <span className="ms-2 d-none d-sm-inline">Vendor PO</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/prodlist"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="bi bi-file-earmark-check"></i>
                  <span className="ms-2 d-none d-sm-inline">Production</span>
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
                <h1>Order Review</h1>
            </div>
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default POlist;