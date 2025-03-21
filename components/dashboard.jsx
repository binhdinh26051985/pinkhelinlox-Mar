import React from 'react'
import { Link, Outlet } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 fw-bolder d-none d-sm-inline">Helinox Dashboard</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <Link to="/dashboard" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                                    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/tryedit" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">trial</span> </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/Stylelist" className="nav-link px-0 align-middle text-white">
                                    <i className="bi bi-box-seam"></i> <span className="ms-1 d-none d-sm-inline">Product</span> </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/polist" className="nav-link px-0 align-middle text-white">
                                    <i className="bi bi-file-earmark-text"></i> <span className="ms-1 d-none d-sm-inline">PO</span> </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/addvendor" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Vendor</span></Link>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className='p-2 d-flex justify-content-center shadow'>
                        <h4>Order Management</h4>
                    </div>

                    <Outlet />

                </div>
            </div>
        </div>
    )
}

export default Dashboard;