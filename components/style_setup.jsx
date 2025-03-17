import axios from "axios";
import React, { useEffect, useState } from "react";
import './style.css'
import { useNavigate } from 'react-router-dom'

const Stylesetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    const skin = parseFloat(formData.skin) || 0;
    const kase = parseFloat(formData.kase) || 0;
    setFormData((prevData) => ({
      ...prevData,
      totalct: skin + kase,
    }));
  }, [formData.skin, formData.kase]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && (name === 'frame' || name === 'print_logo' || name === 'embroidery' || name === 'active')) {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:3000/auth/add_style', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/dashboard')
      //console.log(formDataToSend);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  

  return (
    <div class="container">
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit}>
      <div class="product-card">
        <div class="product-details">
        <p>Product Name: <span id="prod_name">
        <input
            type="text"
            placeholder="input product name"
            name="prod_name"
            value={formData.prod_name}
            onChange={handleChange} required
            class="small-input"
          /></span></p>
          <p>Product Code: <span id="prod_code">
          <input
            type="text"
            placeholder="input product code#"
            name="prod_code"
            value={formData.prod_code}
            onChange={handleChange} required
            class="small-input"
          /></span></p>
          <p>Skin Hours: <span id="skin">
          <input
            type="number"
            step="0.00001"
            name="skin"
            value={formData.skin}
            onChange={handleChange}
            class="small-input"
          /> </span></p>
          <p>Kase Hours: <span id="kase">
          <input
            type="number"
            step="0.00001"
            name="kase"
            value={formData.kase}
            onChange={handleChange}
            class="small-input"
          /> </span></p>
          <p>Total Hours: <span id="totalct">
          <output name="totalct"><b>{formData.totalct}</b></output>
          </span></p>
          <p>Category: <span id="category">
          <select
            name="category"
            value={formData.category}
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
            value={formData.postdate}
            onChange={handleChange}
            class="small-input"
          />
          </span></p>
          <p>Remark: <span id="remark">
          <textarea
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            
          />  </span></p>
          <div class="checkbox-group">
            <label>
            <input
              type="checkbox"
              name="frame"
              checked={formData.frame}
              onChange={handleChange}
              class="small-input"
            />
              Frame
            </label>
            <label>
            <input
              type="checkbox"
              name="print_logo"
              checked={formData.print_logo}
              onChange={handleChange}
              class="small-input"
            />
              Print Logo
            </label>
            <label>
            <input
              type="checkbox"
              name="embroidery"
              checked={formData.embroidery}
              onChange={handleChange}
              class="small-input"
            />
              Embroidery
            </label>
            <label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              class="small-input"
            />
              Active
            </label>
          </div>
          <div class="pdf-link">
          <a><b>Upload Techpack</b></a>
          
          <input
            type="file"
            name="techpack"
            accept=".pdf"
            onChange={handleChange}
          />
          </div>
        </div>
        <div class="product-image">
        <label><b>Upload Product Image:</b>
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
        <button type="submit">Add</button>
      </div>
      </form>
    </div>
  );
};

export default Stylesetup;