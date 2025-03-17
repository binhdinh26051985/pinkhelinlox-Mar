import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Container, Typography, Box } from '@mui/material';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    prod_code: '',
    prod_name: '',
    skin: '0',
    kase: '0',
    totalct: 0,
    frame: false,
    print_logo: false,
    embroidery: false,
    image: null,
    techpack: null,
    category: '',
    postdate: '',
    remark: '',
    active: false,
  });
  useEffect(() => {
    const skin = parseFloat(product.skin) || 0;
    const kase = parseFloat(product.kase) || 0;
    setProduct((prevData) => ({
      ...prevData,
      totalct: skin + kase,
    }));
  }, [product.skin, product.kase]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/style/' + id);
        const data = response.data.Result[0];
        setProduct({
          ...data,
          frame: data.frame === 'true' || data.frame === true,
          print_logo: data.print_logo === 'true' || data.print_logo === true,
          embroidery: data.embroidery === 'true' || data.embroidery === true,
          active: data.active === 'true' || data.active === true,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {

    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: files[0], // Handle file input
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in product) {

      if (key === 'image' || key === 'techpack') {
        // Append files separately
        formData.append(key, product[key]);
      } else {
        formData.append(key, product[key]);
    }}
    try {
      await axios.put('http://localhost:3000/auth/edit_style/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/dashboard'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  return (
    <div class="container">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
      <div class="product-card">
        <div class="product-details">
        <p>Product Name: <span id="prod_name">
        <input
            type="text"
            name="prod_name"
            value={product.prod_name}
            onChange={handleChange}
            class="small-input"
          /></span></p>
          <p>Product Code: <span id="prod_code">
          <input
            type="text"
            name="prod_code"
            value={product.prod_code}
            onChange={handleChange}
            class="small-input"
          /></span></p>
          <p>Skin Hours: <span id="skin">
          <input
            type="number"
            step="0.00001"
            name="skin"
            value={product.skin}
            onChange={handleChange}
            class="small-input"
          /> </span></p>
          <p>Kase Hours: <span id="kase">
          <input
            type="number"
            step="0.00001"
            name="kase"
            value={product.kase}
            onChange={handleChange}
            class="small-input"
          /> </span></p>
          <p>Total Hours: <span id="totalct">
          <output name="totalct"><b>{product.totalct}</b></output>
          </span></p>
          <p>Category: <span id="category">
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            class="small-input"
          >
            <option value="">Select Category</option>
            <option value="chair">Chair</option>
            <option value="table">Table</option>
            <option value="cot">Cot</option>
            <option value="tent">Tent</option>
            <option value="gear">Gear</option>
          </select>
            </span></p>
          <p>Post Date: <span id="postdate">
          <input
            type="date"
            name="postdate"
            value={product.postdate.split('T')[0]}
            onChange={handleChange}
            class="small-input"
          />
          </span></p>
          <p>Remark: <span id="remark">
          <textarea
            name="remark"
            value={product.remark}
            onChange={handleChange}
            
          />  </span></p>
          <div class="checkbox-group">
            <label>
            <input
              type="checkbox"
              name="frame"
              checked={product.frame}
              onChange={handleChange}
              class="small-input"
            />
              Frame
            </label>
            <label>
            <input
              type="checkbox"
              name="print_logo"
              checked={product.print_logo}
              onChange={handleChange}
              class="small-input"
            />
              Print Logo
            </label>
            <label>
            <input
              type="checkbox"
              name="embroidery"
              checked={product.embroidery}
              onChange={handleChange}
              class="small-input"
            />
              Embroidery
            </label>
            <label>
            <input
              type="checkbox"
              name="active"
              checked={product.active}
              onChange={handleChange}
              class="small-input"
            />
              Active
            </label>
          </div>
          <div class="pdf-link">
          <a href={`http://localhost:3000/Teckpacks/` + product.techpack} target="_blank" rel="noopener noreferrer"><b>View Techpack</b></a>
          
          <input
            type="file"
            name="techpack"
            accept=".pdf"
            onChange={handleChange}
          />
          </div>
        </div>
        <div class="product-image">
        
        <img src={`http://localhost:3000/Images/` + product.image} alt="Product" style={{ width: '80%', marginTop: '5px'}} />
        <label><b>Upload Image:</b>
        <input
            type="file"
            name="image"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
        />
        </label>
        </div>
      </div>
      <div class="buttons">
        <button type="submit">Update Product</button>
      </div>
      </form>
    </div>
  );
};

export default EditProduct;