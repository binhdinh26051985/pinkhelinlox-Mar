import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const POSearch = () => {
  const [poList, setPoList] = useState([]);
  const [factories, setFactories] = useState([]);
  const [dests, setDests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    vendorpo: '',
    poRemark: '',
    factory: '',
    poDate: '',
    orderType: '',
    orderCycle: '',
    season: '',
    sap: '',
    product: '',
    color: '',
    qty: '',
    customerpo: '',
    destination: '',
    delivery: '',
    remark: ''
  });

  // Fetch initial data
  useEffect(() => {
    // Fetch all POs
    axios.get('http://localhost:3000/auth/posearch')
      .then(response => setPoList(response.data))
      .catch(error => console.error('Error fetching POs:', error));

    // Fetch factories
    axios.get('http://localhost:3000/auth/vendorname')
      .then(response => setFactories(response.data))
      .catch(error => console.error('Error fetching factories:', error));

    // Fetch destinations
    axios.get('http://localhost:3000/auth/destiny')
      .then(response => setDests(response.data))
      .catch(error => console.error('Error fetching destinations:', error));
  }, []);

  // Handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    axios.get(`http://localhost:3000/auth/posearch?q=${event.target.value}`)
      .then(response => setPoList(response.data))
      .catch(error => console.error('Error searching POs:', error));
  };

  // Handle edit button click
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditFormData(poList[index]);
  };

  // Handle delete button click
  const handleDelete = (index) => {
    const poId = poList[index].id; // Ensure your PO objects have an `id` field
    const updatedPoList = poList.filter((_, i) => i !== index);
    setPoList(updatedPoList);
    axios.delete(`http://localhost:3000/auth/delete_po/${poId}`)
      .then(response => console.log('PO deleted successfully'))
      .catch(error => console.error('Error deleting PO:', error));
  };

  // Handle form field changes
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });

    // Fetch product and color when SAP changes
    if (name === 'sap') {
      axios.get(`http://localhost:3000/auth/sapinfo?sap=${value}`)
        .then(response => {
          if (response.data.length > 0) {
            const { prod_name, color_name } = response.data[0]; // Assuming the API returns an array
            setEditFormData(prevState => ({
              ...prevState,
              product: prod_name,
              color: color_name
            }));
          }
        })
        .catch(error => console.error('Error fetching product and color:', error));
    }
  };

  // Handle form submission
  const handleEditSubmit = (event) => {
    event.preventDefault();
    const updatedPoList = poList.map((po, index) =>
      index === editingIndex ? editFormData : po
    );
    setPoList(updatedPoList);
    setEditingIndex(null);
    axios.put(`http://localhost:3000/auth/updatepo/${editFormData.id}`, editFormData)
      .then(response => console.log('PO updated successfully'))
      .catch(error => console.error('Error updating PO:', error));
  };

  // Handle cancel button click
  const handleCancel = () => {
    setEditingIndex(null);
    setEditFormData({
      vendorpo: '',
      poRemark: '',
      factory: '',
      poDate: '',
      orderType: '',
      orderCycle: '',
      season: '',
      sap: '',
      product: '',
      color: '',
      qty: '',
      customerpo: '',
      destination: '',
      delivery: '',
      remark: ''
    });
  };

  return (

    <div className="po-search-container">
      <div className="buttons">
        <Link to="/dashboard/addpo" className="btn">Add PO </Link>
      </div>
      {editingIndex !== null && (
        <form className="po-form" onSubmit={handleEditSubmit}>
          <h2>Edit PO</h2>
          <div className="form-row">
          <label>
            Vendor PO#
            <input
              type="text"
              name="vendorpo"
              value={editFormData.vendorpo}
              onChange={handleEditChange}
              placeholder="Vendor PO#"
            />
          </label>
          <label>
            PO Remark
            <input
              type="text"
              name="poRemark"
              value={editFormData.poRemark}
              onChange={handleEditChange}
              placeholder="PO Remark"
            />
          </label>
          <label>
            Factory
            <select
              name="factory"
              value={editFormData.factory}
              onChange={handleEditChange}
            >
              <option value="">Select Factory</option>
              {factories.map((factory, index) => (
                <option key={index} value={factory.name}>
                  {factory.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            PO Date
            <input
              type="date"
              name="poDate"
              value={editFormData.poDate.split('T')[0]}
              onChange={handleEditChange}
              placeholder="PO Date"
            />
          </label>
          <label>
            Order Type
            <select
              name="orderType"
              value={editFormData.orderType}
              onChange={handleEditChange}
            >
              <option value="">Select Order Type</option>
              <option value="Inline">Inline</option>
              <option value="SMU">SMU</option>
              <option value="SMS">SMS</option>
            </select>
          </label>
          <label>
            Order Cycle
            <select
              name="orderCycle"
              value={editFormData.orderCycle}
              onChange={handleEditChange}
            >
              <option value="">Select Cycle</option>
              <option value="Buy#1">Buy#1</option>
              <option value="Buy#2">Buy#2</option>
              <option value="Buy#3">Buy#3</option>
              <option value="Buy#4">Buy#4</option>
              <option value="SMU">SMU</option>
              <option value="SMS">SMS</option>
            </select>
          </label>
          <label>
            Season
            <input
              type="text"
              name="season"
              value={editFormData.season}
              onChange={handleEditChange}
              placeholder="Season"
            />
          </label>
          <label>
            SAP
            <input
              type="text"
              name="sap"
              value={editFormData.sap}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            Product
            <input
              type="text"
              name="product"
              value={editFormData.product}
              readOnly
            />
          </label>
          <label>
            Color
            <input
              type="text"
              name="color"
              value={editFormData.color}
              readOnly
            />
          </label>
          <label>
            Qty
            <input
              type="number"
              name="qty"
              value={editFormData.qty}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Delivery Date
            <input
              type="date"
              name="delivery"
              value={editFormData.delivery.split('T')[0]}
              onChange={handleEditChange}
              placeholder="Delivery Date"
            />
          </label>
          <label>
            Destination
            <select
              name="destination"
              value={editFormData.destination}
              onChange={handleEditChange}
            >
              <option value="">Select Destination</option>
              {dests.map(destination => (
                <option key={destination.id} value={destination.dest}>
                  {destination.dest}
                </option>
              ))}
            </select>
          </label>
          <label>
            Customer PO
            <input
              type="text"
              name="customerpo"
              value={editFormData.customerpo}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Remark
            <input
              type="text"
              name="remark"
              value={editFormData.remark}
              onChange={handleEditChange}
            />
          </label>
          </div>
          <div className="form-row">
            <button type="submit" className="btn btn-outline-success">
              <i className="bi bi-save"></i> Save
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-outline-secondary">
              <i className="bi bi-x-circle"></i> Cancel
            </button>
          </div>

        </form>
      )}

      <h1>PO Details</h1>
      <input
        type="text"
        placeholder="Search POs..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <table>
        {poList.length > 0 && (
          <thead>
            <tr>
              <th>Vendor PO#</th>
              <th>PO Remark</th>
              <th>Factory</th>
              <th>PO Date</th>
              <th>Order Type</th>
              <th>Order Cycle</th>
              <th>Season</th>
              <th>SAP</th>
              <th>Product</th>
              <th>Color</th>
              <th>Qty</th>
              <th>Customer PO</th>
              <th>Dest</th>
              <th>Delivery</th>
              <th>Remark</th>
              <th>Update</th>

            </tr>
          </thead>
        )}
        <tbody>
          {poList.map((po, index) => (
            <tr key={index}>
              <td>{po.vendorpo}</td>
              <td>{po.poRemark}</td>
              <td>{po.factory}</td>
              <td>{po.poDate.split('T')[0]}</td>
              <td>{po.orderType}</td>
              <td>{po.orderCycle}</td>
              <td>{po.season}</td>
              <td>{po.sap}</td>
              <td>{po.product}</td>
              <td>{po.color}</td>
              <td>{po.qty}</td>
              <td>{po.customerpo}</td>
              <td>{po.destination}</td>
              <td>{po.delivery.split('T')[0]}</td>
              <td>{po.remark}</td>
              <td>
                <button onClick={() => handleEdit(index)} className="btn btn-outline-primary">
                  <i className="bi bi-pencil"></i>
                </button>
                <button onClick={() => handleDelete(index)} className="btn btn-outline-danger">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default POSearch;
