import React, { useState, useEffect } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./style.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="">PSR</a>
      <a href="">Daily Output</a>
      <a href="">Shipment</a>
      <a href="">Capacity</a>
      <a href="">Overtime</a>
    </nav>
  );
};

const Ordplan = () => {
  const [ORList, setORList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sapOptions, setSapOptions] = useState([]);
  const [showSkinGroup, setShowSkinGroup] = useState(true);
  const [showCaseGroup, setShowCaseGroup] = useState(true);
  const [showCycletime, setShowcycletime] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/auth/posearch')
      .then(response => setORList(response.data))
      .catch(error => console.error('Error fetching POs:', error));

    axios.get('http://localhost:3000/auth/viewprodcolor')
      .then(response => setSapOptions(response.data))
      .catch(error => console.error('Error fetching product colors:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    axios.get(`http://localhost:3000/auth/posearch?q=${event.target.value}`)
      .then(response => setORList(response.data))
      .catch(error => console.error('Error searching POs:', error));
  };

  const toggleSkinGroup = () => {
    setShowSkinGroup(!showSkinGroup);
  };

  const toggleCaseGroup = () => {
    setShowCaseGroup(!showCaseGroup);
  };

  const togglectime = () => {
    setShowcycletime(!showCycletime);
  };

  const handleInputChange = (event, poId, field) => {
    const { value, type, checked } = event.target;

    // If the input is a checkbox and it's checked, set the current date
    if (type === 'checkbox' && checked) {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      setFormData(prevState => ({
        ...prevState,
        [poId]: {
          ...prevState[poId],
          [field]: currentDate // Save the current date
        }
      }));
    } else if (type === 'checkbox' && !checked) {
      // If the checkbox is unchecked, remove the date
      setFormData(prevState => ({
        ...prevState,
        [poId]: {
          ...prevState[poId],
          [field]: null // Remove the date
        }
      }));
    } else {
      // For other input types, handle normally
      setFormData(prevState => ({
        ...prevState,
        [poId]: {
          ...prevState[poId],
          [field]: value
        }
      }));
    }
  };

  const handleSaveAll = () => {
    // Prepare data for submission
    const dataToSave = Object.keys(formData).map(poId => ({
      poId,
      data: formData[poId],
    }));

    // Send data to the backend
    axios.post('http://localhost:3000/auth/saveAllPlans', dataToSave)
      .then(response => {
        alert('All changes saved successfully!');
        setFormData({}); // Clear form data after saving
      })
      .catch(error => {
        console.error('Error saving data:', error);
        alert('Failed to save changes.');
      });
  };


  const calculateColSpan = (group) => {
    switch (group) {
      case 'Order Information':
        return 12 + (showCycletime ? 3 : 0);
      case 'Pre Production':
        return 8;
      case 'Skin Plan':
        return showSkinGroup ? 6 : 0;
      case 'Case Plan':
        return showCaseGroup ? 6 : 0;
      default:
        return 0;
    }
  };

  return (
    <div className="">
      <div>
        <h1>Production Plan</h1>
        <input
          type="text"
          placeholder="Search POs..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <div>
          <label>
            <input
              type="checkbox"
              checked={showCycletime}
              onChange={togglectime}
            /> Show Cycle time
          </label>
          <label>
            <input
              type="checkbox"
              checked={showSkinGroup}
              onChange={toggleSkinGroup}
            /> Show Skin plan
          </label>
          <label>
            <input
              type="checkbox"
              checked={showCaseGroup}
              onChange={toggleCaseGroup}
            /> Show Case plan
          </label>
        </div>

        <div className="table-container">
          <table>
            {ORList.length > 0 && (
              <thead>
                <tr>
                  <th colSpan={calculateColSpan('Order Information')}>Order Information</th>
                  <th colSpan={calculateColSpan('Pre Production')}>Pre Production</th>
                  {showSkinGroup && <th colSpan={calculateColSpan('Skin Plan')}>Skin Plan</th>}
                  {showCaseGroup && <th colSpan={calculateColSpan('Case Plan')}>Case Plan</th>}
                </tr>
                <tr>
                  <th>Vendor</th>
                  <th>Order#</th>
                  <th>CYCLE#</th>
                  <th>SAP</th>
                  <th>Product</th>
                  <th>Color</th>
                  <th>Qty</th>
                  <th>Delivery</th>
                  <th>Dest</th>
                  <th>CustPO#</th>
                  <th>Ord Remark</th>
                  {showCycletime && <th>Skin_Hrs</th>}
                  {showCycletime && <th>Case_Hrs</th>}
                  {showCycletime && <th>CTime_Hrs</th>}
                  <th>Plan Remark</th>
                  <th>Mat_Ready</th>
                  <th>Actual</th>
                  <th>PPM</th>
                  <th>Actual</th>
                  <th>Cut</th>
                  <th>Actual</th>
                  <th>Print/Emb</th>
                  <th>Actual</th>
                  {showSkinGroup && <th>Skin_Loc</th>}
                  {showSkinGroup && <th>Skin_Line</th>}
                  {showSkinGroup && <th>Skin_Sewers</th>}
                  {showSkinGroup && <th>Skin_Work(hrs)</th>}
                  {showSkinGroup && <th>Skin_input</th>}
                  {showSkinGroup && <th>Skin_output</th>}
                  {showCaseGroup && <th>Case_Loc</th>}
                  {showCaseGroup && <th>Case_Line</th>}
                  {showCaseGroup && <th>Case_Sewers</th>}
                  {showCaseGroup && <th>Case_Work(hrs)</th>}
                  {showCaseGroup && <th>Case_input</th>}
                  {showCaseGroup && <th>Case_output</th>}
                </tr>
              </thead>
            )}
            <tbody>
              {ORList.map((po, index) => {
                const sapData = sapOptions.find(option => option.SAP_id === po.sap);
                return (
                  <tr key={index}>
                    <td>{po.factory}</td>
                    <td>{po.id}</td>
                    <td>{po.orderCycle}</td>
                    <td>{po.sap}</td>
                    <td>{po.product}</td>
                    <td>{po.color}</td>
                    <td>{po.qty}</td>
                    <td>{po.delivery.split('T')[0]}</td>
                    <td>{po.destination}</td>
                    <td>{po.customerpo}</td>
                    <td>{po.remark}</td>
                    {showCycletime && <td>{sapData ? sapData.skin : 'N/A'}</td>}
                    {showCycletime && <td>{sapData ? sapData.kase : 'N/A'}</td>}
                    {showCycletime && <td>{sapData ? sapData.totalct : 'N/A'}</td>}
                    <td>
                      <textarea
                        name="planmark"
                        value={formData[po.id]?.planmark || ''}
                        onChange={(e) => handleInputChange(e, po.id, 'planmark')}
                      />
                    </td>
                    <td><input type="date" name="mat_eta" value={formData[po.id]?.mat_eta || ''} onChange={(e) => handleInputChange(e, po.id, 'mat_eta')} /></td>
                    <td>
                      <input
                        type="checkbox"
                        name="mat_done"
                        className="small-input"
                        checked={formData[po.id]?.mat_done || false}
                        onChange={(e) => handleInputChange(e, po.id, 'mat_done')}
                      />
                    </td>

                    <td><input type="date" name="ppm" value={formData[po.id]?.ppm || ''} onChange={(e) => handleInputChange(e, po.id, 'ppm')} /></td>
                    <td>
                      <input
                        type="checkbox"
                        name="ppmdone"
                        className="small-input"
                        checked={formData[po.id]?.ppmdone || false}
                        onChange={(e) => handleInputChange(e, po.id, 'ppmdone')}
                      />
                    </td>
                    <td><input type="date" name="cut" value={formData[po.id]?.cut || ''} onChange={(e) => handleInputChange(e, po.id, 'cut')} /></td>
                    <td>
                      <input
                        type="checkbox"
                        name="cutdone"
                        className="small-input"
                        checked={formData[po.id]?.cutdone || false}
                        onChange={(e) => handleInputChange(e, po.id, 'cutdone')}
                      />
                    </td>

                    <td><input type="date" name="print_emb" value={formData[po.id]?.print_emb || ''} onChange={(e) => handleInputChange(e, po.id, 'print_emb')} /></td>
                    <td>
                      <input
                        type="checkbox"
                        name="print_embdone"
                        className="small-input"
                        checked={formData[po.id]?.print_embdone || false}
                        onChange={(e) => handleInputChange(e, po.id, 'print_embdone')}
                      />
                    </td>

                    {showSkinGroup && <td><input type='text' name="skinloc" value={formData[po.id]?.skinloc || ''} onChange={(e) => handleInputChange(e, po.id, 'skinloc')} /></td>}
                    {showSkinGroup && <td><input type='text' name="skinline" value={formData[po.id]?.skinline || ''} onChange={(e) => handleInputChange(e, po.id, 'skinline')} /></td>}
                    {showSkinGroup && <td><input type='number' name="skinsewer" value={formData[po.id]?.skinsewer || ''} onChange={(e) => handleInputChange(e, po.id, 'skinsewer')} /></td>}
                    {showSkinGroup && <td><input type='number' name="skinworkhrs" value={formData[po.id]?.skinworkhrs || ''} onChange={(e) => handleInputChange(e, po.id, 'skinworkhrs')} /></td>}
                    {showSkinGroup && <td><input type="date" name="skinput" value={formData[po.id]?.skinput || ''} onChange={(e) => handleInputChange(e, po.id, 'skinput')} /></td>}
                    {showSkinGroup && <td><input type="date" name="skinouput" value={formData[po.id]?.skinouput || ''} onChange={(e) => handleInputChange(e, po.id, 'skinouput')} /></td>}
                    {showCaseGroup && <td><input type='text' name="kaseloc" value={formData[po.id]?.kaseloc || ''} onChange={(e) => handleInputChange(e, po.id, 'kaseloc')} /></td>}
                    {showCaseGroup && <td><input type='text' name="kaseline" value={formData[po.id]?.kaseline || ''} onChange={(e) => handleInputChange(e, po.id, 'kaseline')} /></td>}
                    {showCaseGroup && <td><input type='number' name="kasesewers" value={formData[po.id]?.kasesewers || ''} onChange={(e) => handleInputChange(e, po.id, 'kasesewers')} /></td>}
                    {showCaseGroup && <td><input type='number' name="kaseworkhrs" value={formData[po.id]?.kaseworkhrs || ''} onChange={(e) => handleInputChange(e, po.id, 'kaseworkhrs')} /></td>}
                    {showCaseGroup && <td><input type="date" name="kaseinput" value={formData[po.id]?.kaseinput || ''} onChange={(e) => handleInputChange(e, po.id, 'kaseinput')} /></td>}
                    {showCaseGroup && <td><input type="date" name="kaseouput" value={formData[po.id]?.kaseouput || ''} onChange={(e) => handleInputChange(e, po.id, 'kaseouput')} /></td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={handleSaveAll} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Save All
          </button>
        </div>
      </div>
    </div>
  );
};

const Prodlist = () => {
  return (
    <div>
      <Navbar />
      <Ordplan />
    </div>
  );
};

export default Prodlist;