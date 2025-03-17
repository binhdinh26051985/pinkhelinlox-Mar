import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Addvendor = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        vendorcode: '',
        active: false
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_vendor', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard')
                } else
                alert(result.data.Error)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add Vendor</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Vendor Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            name="name"
                            value={formData.name}
                            placeholder="Input vendor name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Vendor code
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            name="vendorcode"
                            value={formData.vendorcode}
                            placeholder="Input vendor code"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputPassword4" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control rounded-0"
                            placeholder="input Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="active"
                                checked={formData.active}
                                onChange={handleChange}
                            />
                            Active
                        </label>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Add Vendor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addvendor;