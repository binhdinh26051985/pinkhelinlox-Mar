import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Prodgenerate = () => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedColorId, setSelectedColorId] = useState('');
  const [productSAP, setProductSAP] = useState(''); // New state for Product_SAP
  const [productDetails, setProductDetails] = useState([]); // State to store all product details
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/auth/products');
      setProducts(response.data);
    };

    const fetchColors = async () => {
      const response = await axios.get('http://localhost:3000/auth/colorlist');
      setColors(response.data);
    };

    const fetchProductDetails = async () => {
      const response = await axios.get('http://localhost:3000/auth/viewprodcolor');
      setProductDetails(response.data);
    };

    fetchProducts();
    fetchColors();
    fetchProductDetails();
  }, []);

  const saveprodncolor = async () => {
    if (!selectedProductId || !selectedColorId || !productSAP) {
      alert('Please select product, color, and enter Product_SAP.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/prodncolor', {
        selectedProductId,
        selectedColorId,
        productSAP
      });
      alert('Product details saved successfully!');
      // Clear the form fields
      setSelectedProductId('');
      setSelectedColorId('');
      setProductSAP('');
      // Fetch updated product details
      const response = await axios.get('http://localhost:3000/auth/viewprodcolor');
      setProductDetails(response.data);
    } catch (error) {
      console.error('Error saving product details:', error);
      alert('Failed to save product details.');
    }
  };

  const deleteProductColor = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/auth/deleteprodcolor/${id}`);
      alert('Already delete!');
      // Fetch updated product details
      const response = await axios.get('http://localhost:3000/auth/viewprodcolor');
      setProductDetails(response.data);
    } catch (error) {
      console.error('Error deleting product color:', error);
      alert('Can not delete!');
    }
  };

  // Filter product details based on search query
  const filteredProductDetails = productDetails.filter(detail =>
    detail.prod_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    detail.color_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    detail.SAP_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Product & Color Generator</h3>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label"><b>Select Product</b></label>
              <select className="form-select" onChange={(e) => setSelectedProductId(e.target.value)} value={selectedProductId}>
                <option value="">Select a product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.prod_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label"><b>Select Color</b></label>
              <select className="form-select" onChange={(e) => setSelectedColorId(e.target.value)} value={selectedColorId}>
                <option value="">Select a color</option>
                {colors.map(color => (
                  <option key={color.id} value={color.id}>
                    {color.color_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label"><b>Input Product_SAP</b></label>
              <input type="text" className="form-control" value={productSAP} onChange={(e) => setProductSAP(e.target.value)} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={saveprodncolor}>Create</button>
        </div>
      </div>

      <h3 className="mt-5">Product & Color</h3>
      <div className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product, color, or SAP ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="input-group-text"><i className="bi bi-search"></i></span>
        </div>
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Color</th>
            <th>Product_SAP</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductDetails.map(detail => (
            <tr key={detail.id}>
              <td>{detail.id}</td>
              <td>{detail.prod_name}</td>
              <td>{detail.color_name}</td>
              <td>{detail.SAP_id}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteProductColor(detail.id)}>
                <i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prodgenerate;