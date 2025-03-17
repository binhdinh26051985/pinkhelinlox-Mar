import React, { useState, useEffect } from 'react';
import axios from 'axios';

const POadd = () => {
  const [orderTypes, setOrderTypes] = useState(['Inline', 'SMU', 'SMS']);
  const [orderCycles, setOrderCycles] = useState(['Buy#1', 'Buy#2', 'Buy#3', 'Buy#4', 'SMU', 'SMS']);
  const [factories, setFactories] = useState([]);
  const [sapOptions, setSapOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [orderPlacements, setOrderPlacements] = useState([{ id: '', sap: '', product: '', color: '', qty: '', delivery: '', destination: '', customerpo: '', remark: '' }]);
  const [vendorpo, setVendorPo] = useState('');
  const [poRemark, setPoRemark] = useState('');
  const [factory, setFactory] = useState('');
  const [poDate, setPoDate] = useState('');
  const [orderType, setOrderType] = useState('');
  const [orderCycle, setOrderCycle] = useState('');
  const [season, setSeason] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Fetch data from MySQL via API
    axios.get('http://localhost:3000/auth/vendorname').then(response => setFactories(response.data));
    axios.get('http://localhost:3000/auth/viewprodcolor').then(response => setSapOptions(response.data));
    axios.get('http://localhost:3000/auth/destiny').then(response => setDestinations(response.data));
  }, []);

  const handleSapChange = (index, value) => {
    const updatedOrderPlacements = [...orderPlacements];
    updatedOrderPlacements[index].sap = value;

    const selectedSap = sapOptions.find(option => option.SAP_id === value);
    if (selectedSap) {
      updatedOrderPlacements[index].product = selectedSap.prod_name;
      updatedOrderPlacements[index].color = selectedSap.color_name;
    } else {
      updatedOrderPlacements[index].product = '';
      updatedOrderPlacements[index].color = '';
    }

    setOrderPlacements(updatedOrderPlacements);
  };

  const handleInputChange = (index, field, value) => {
    const updatedOrderPlacements = [...orderPlacements];
    updatedOrderPlacements[index][field] = value;
    setOrderPlacements(updatedOrderPlacements);
  };

  const addOrderPlacement = () => {
    setOrderPlacements([...orderPlacements, { id: '', sap: '', product: '', color: '', qty: '', delivery: '', destination: '', customerpo: '', remark: '' }]);
  };

  const deleteOrderPlacement = (index) => {
    if (index !== 0) {
      const updatedOrderPlacements = orderPlacements.filter((_, i) => i !== index);
      setOrderPlacements(updatedOrderPlacements);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/vendorpo', {
      records: orderPlacements,
      commonValues: {
        vendorpo,
        poRemark,
        factory,
        poDate,
        orderType,
        orderCycle,
        season
      }
    })
      .then(response => {
        console.log(response.data);
        // Reset form fields
        setVendorPo('');
        setPoRemark('');
        setFactory('');
        setPoDate('');
        setOrderType('');
        setOrderCycle('');
        setSeason('');
        setOrderPlacements([{ id: '', sap: '', product: '', color: '', qty: '', delivery: '', destination: '', customerpo: '', remark: '' }]);
        setEditIndex(null);
      })
      .catch(error => {
        console.error('There was an error saving the data!', error);
      });
  };

  return (
    <div className="po-container">
      <div className="po-block">
        <h1>Purchasing Order</h1>
        <form className="po-form" onSubmit={handleSubmit}>
        
          <div className="order-placement-block">
            <label>Vendor PO# <input type="text" name="vendorpo" value={vendorpo} onChange={(e) => setVendorPo(e.target.value)} /></label>
            <label>PO Remark <input type="text" name="poRemark" value={poRemark} onChange={(e) => setPoRemark(e.target.value)} /></label>
            <label>Factory 
              <select name="factory" value={factory} onChange={(e) => setFactory(e.target.value)}>
                <option value="">Select Factory</option>
                {factories.map(factory => <option key={factory.id} value={factory.name}>{factory.name}</option>)}
              </select>
            </label>
          </div>
          <div className="order-placement-block">
            <label>PO Date <input type="date" name="poDate" value={poDate} onChange={(e) => setPoDate(e.target.value)} /></label>
            <label>Order Type 
              <select name="orderType" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                <option value="">Select Order Type</option>
                {orderTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label>Order Cycle 
              <select name="orderCycle" value={orderCycle} onChange={(e) => setOrderCycle(e.target.value)}>
                <option value="">Select Order Cycle</option>
                {orderCycles.map(cycle => <option key={cycle} value={cycle}>{cycle}</option>)}
              </select>
            </label>
            <label>Season <input type="text" name="season" value={season} onChange={(e) => setSeason(e.target.value)} /></label>
          </div>
          <div className="order-placement-block">
            {orderPlacements.map((placement, index) => (
              <div key={index} className="form-row">
                <label>SAP <input type="text" name="sap" value={placement.sap} onChange={(e) => handleSapChange(index, e.target.value)} required/></label>
                <label>Product <input type="text" name="product" value={placement.product} readOnly /></label>
                <label>Color <input type="text" name="color" value={placement.color} readOnly /></label>
                <label>Qty <input type="number" name="qty" value={placement.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} /></label>
                <label>Delivery Date <input type="date" name="delivery" value={placement.delivery} onChange={(e) => handleInputChange(index, 'delivery', e.target.value)} /></label>
                <label>Destination 
                  <select name="destination" value={placement.destination} onChange={(e) => handleInputChange(index, 'destination', e.target.value)}>
                    <option value="">Select Destination</option>
                    {destinations.map(destination => <option key={destination.id} value={destination.dest}>{destination.dest}</option>)}
                  </select>
                </label>
                <label>Customer PO <input type="text" name="customerpo" value={placement.customerpo} onChange={(e) => handleInputChange(index, 'customerpo', e.target.value)} /></label>
                <label>Remark <input type="text" name="remark" value={placement.remark} onChange={(e) => handleInputChange(index, 'remark', e.target.value)} /></label>
                <button type="button" onClick={() => addOrderPlacement()} className="btn btn-outline-primary"><i className="bi bi-plus"></i></button>
                <button type="button" onClick={() => deleteOrderPlacement(index)} className="btn btn-outline-danger"><i className="bi bi-trash"></i></button>
                
              </div>
            ))}
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default POadd;