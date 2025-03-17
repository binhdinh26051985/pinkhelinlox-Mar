import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Dailysew = () => {
    const [prodate, setProdate] = useState('');
    const [lines, setLines] = useState([{ vendor: '', location: '', line: '', sewers: '', workhrs: '' }]);
    const [searchQuery, setSearchQuery] = useState('');
    const [poList, setPoList] = useState([]);
    const [sapOptions, setSapOptions] = useState([]);
    const [outputData, setOutputData] = useState({
        prodate: '',
        location: '',
        line: '',
    });
    const [userInputs, setUserInputs] = useState({}); // To store user inputs for each PO

    // Handle changes in line inputs
    const handleLineChange = (index, event) => {
        const { name, value } = event.target;
        const newLines = [...lines];
        newLines[index][name] = value;
        setLines(newLines);
    };

    // Add a new line
    const addLine = () => {
        setLines([...lines, { vendor: '', location: '', line: '', sewers: '', workhrs: '' }]);
    };

    // Remove a line (except the first one)
    const removeLine = (index) => {
        if (index !== 0) {
            const newLines = lines.filter((_, i) => i !== index);
            setLines(newLines);
        }
    };

    // Handle form submission for daily capacity
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            prodate,
            lines
        };

        try {
            const response = await axios.post('http://localhost:3000/auth/savedailycap', formData);
            if (response.data.success) {
                alert('Data saved successfully!');
                setProdate('');
                setLines([{ vendor: '', location: '', line: '', sewers: '', workhrs: '' }]);
            } else {
                alert('Failed to save data.');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('An error occurred while saving data.');
        }
    };

    // Handle changes in output data
    const handleOutputChange = (event) => {
        const { name, value } = event.target;
        setOutputData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle changes in user inputs for each PO
    const handleUserInputChange = (poId, field, value) => {
        setUserInputs(prevState => ({
            ...prevState,
            [poId]: {
                ...prevState[poId],
                [field]: value
            }
        }));
    };

    const saveoutput = async (event) => {
        event.preventDefault();
    
        // Prepare data for submission
        const recordsToSave = poList.map(po => {
            const sapData = sapOptions.find(option => option.SAP_id === po.sap); // Find sapData for the current PO
            return {
                prodate: outputData.prodate,
                location: outputData.location,
                line: outputData.line,
                factory: po.factory,
                orderid: po.id,
                sap: po.sap,
                product: po.product,
                color: po.color,
                skin: sapData ? sapData.skin : 0, // Include skin value from sapData
                kase: sapData ? sapData.kase : 0, // Include kase value from sapData
                skinqty: userInputs[po.id]?.skinqty || 0,
                caseqty: userInputs[po.id]?.caseqty || 0,
                packqty: userInputs[po.id]?.packqty || 0
            };
        });
    
        try {
            const response = await axios.post('http://localhost:3000/auth/savedailyoutput', recordsToSave);
            if (response.data.success) {
                alert('Output data saved successfully!');
                setOutputData({
                    prodate: '',
                    location: '',
                    line: '',
                });
                setUserInputs({}); // Reset user inputs
            } else {
                alert('Failed to save output data.');
            }
        } catch (error) {
            console.error('Error saving output data:', error);
            alert('An error occurred while saving output data.');
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3000/auth/viewprodcolor')
            .then(response => {
                setSapOptions(response.data);
            })
            .catch(error => console.error('Error fetching product colors:', error));
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        axios.get(`http://localhost:3000/auth/posearch?q=${event.target.value}`)
            .then(response => setPoList(response.data))
            .catch(error => console.error('Error searching POs:', error));
    };

    return (
        <div className="po-container">
            <div className="po-block">
                <h1>Daily Capacity</h1>
                <form onSubmit={handleSubmit}>
                    <button type="submit">Save Capacity</button>
                    <div className="order-placement-block">
                        <label>
                            Production Date
                            <input
                                type="date"
                                name="prodate"
                                value={prodate}
                                onChange={(e) => setProdate(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    {lines.map((lineData, index) => (
                        <div className="order-placement-block" key={index}>
                            <div className="form-row">
                                <label>
                                    Vendor
                                    <input
                                        type="text"
                                        name="vendor"
                                        value={lineData.vendor}
                                        onChange={(e) => handleLineChange(index, e)}
                                        required
                                    />
                                </label>
                                <label>
                                    Location
                                    <input
                                        type="text"
                                        name="location"
                                        value={lineData.location}
                                        onChange={(e) => handleLineChange(index, e)}
                                        required
                                    />
                                </label>
                                <label>
                                    Line#
                                    <input
                                        type="text"
                                        name="line"
                                        value={lineData.line}
                                        onChange={(e) => handleLineChange(index, e)}
                                        required
                                    />
                                </label>
                                <label>
                                    Total Sewers
                                    <input
                                        type="number"
                                        name="sewers"
                                        value={lineData.sewers}
                                        onChange={(e) => handleLineChange(index, e)}
                                        required
                                    />
                                </label>
                                <label>
                                    Working Hours
                                    <input
                                        type="number"
                                        name="workhrs"
                                        value={lineData.workhrs}
                                        onChange={(e) => handleLineChange(index, e)}
                                        required
                                    />
                                </label>
                                {index !== 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeLine(index)}
                                        className="btn btn-outline-danger"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={addLine}
                                    className="btn btn-outline-primary"
                                >
                                    <i className="bi bi-plus"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </form>

                <div className='order-placement-block'>
                    <h1>Daily Output</h1>
                    <form onSubmit={saveoutput}>
                        <button type="submit">Save Output</button>
                        <div className='order-placement-block'>
                            <label>
                                <b>Output date</b>
                                <input
                                    type="date"
                                    name="prodate"
                                    value={outputData.prodate}
                                    onChange={handleOutputChange}
                                    required
                                />
                            </label>
                            <label>
                                <b>Location</b>
                                <input
                                    type="text"
                                    name="location"
                                    value={outputData.location}
                                    onChange={handleOutputChange}
                                    required
                                />
                            </label>
                            <label>
                                <b>Line</b>
                                <input
                                    type="text"
                                    name="line"
                                    value={outputData.line}
                                    onChange={handleOutputChange}
                                    required
                                />
                            </label>
                        </div>
                        <input
                            type="text"
                            placeholder="Search sap, product ..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="search-input"
                        />

                        {poList.length > 0 && (
                            <div className="po-list">
                                {poList.map((po) => {
                                    const sapData = sapOptions.find(option => option.SAP_id === po.sap);

                                    return (
                                        <div key={po.id} className="po-item">
                                            <div className="po-field">
                                                <label>Vendor</label>
                                                <input type="text" name="factory" value={po.factory} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Season</label>
                                                <input type="text" name="season" value={po.season} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Cycle#</label>
                                                <input type="text" name="orderCycle" value={po.orderCycle} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Destination</label>
                                                <input type="text" name="destination" value={po.destination} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>SAP</label>
                                                <input type="text" name="sap" value={po.sap} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Product</label>
                                                <input type="text" name="product" value={po.product} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Color</label>
                                                <input type="text" name="color" value={po.color} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Qty</label>
                                                <input type="number" name="qty" value={po.qty} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Delivery</label>
                                                <input type="date" name="delivery" value={po.delivery ? po.delivery.split("T")[0] : ""} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>PO</label>
                                                <input type="text" name="customerpo" value={po.customerpo} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Skin hrs</label>
                                                <input type="number" name="skin" value={sapData ? sapData.skin : ''} readOnly />
                                                <label>Case hrs</label>
                                                <input type="number" name="kase" value={sapData ? sapData.kase : ''} readOnly />
                                                <label>Total CTime</label>
                                                <input type="number" name="totalct" value={sapData ? sapData.totalct : ''} readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Total Skin</label>
                                                <input type="text" readOnly />
                                                <label>Total Case</label>
                                                <input type="text" readOnly />
                                                <label>Total Pack</label>
                                                <input type="number" readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Balance Skin</label>
                                                <input type="text" readOnly />
                                                <label>Balance Case</label>
                                                <input type="text" readOnly />
                                                <label>Balance Pack</label>
                                                <input type="number" readOnly />
                                            </div>
                                            <div className="po-field">
                                                <label>Daily Skin Output</label>
                                                <input
                                                    type="number"
                                                    name="skinqty"
                                                    value={userInputs[po.id]?.skinqty || ''}
                                                    onChange={(e) => handleUserInputChange(po.id, 'skinqty', e.target.value)}
                                                />
                                                <label>Daily Case Output</label>
                                                <input
                                                    type="number"
                                                    name="caseqty"
                                                    value={userInputs[po.id]?.caseqty || ''}
                                                    onChange={(e) => handleUserInputChange(po.id, 'caseqty', e.target.value)}
                                                />
                                                <label>Daily Pack Output</label>
                                                <input
                                                    type="number"
                                                    name="packqty"
                                                    value={userInputs[po.id]?.packqty || ''}
                                                    onChange={(e) => handleUserInputChange(po.id, 'packqty', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dailysew;