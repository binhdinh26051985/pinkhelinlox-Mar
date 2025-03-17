import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Detailstyle = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/auth/search?q=${query}`);
      const formattedResults = response.data.map(result => ({
        ...result,
        frame: result.frame === 'true' || result.frame === true,
        print_logo: result.print_logo === 'true' || result.print_logo === true,
        embroidery: result.embroidery === 'true' || result.embroidery === true,
        active: result.active === 'true' || result.active === true,
      }));
      setResults(formattedResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  //const navigate = useNavigate()

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const result = await axios.delete(`http://localhost:3000/auth/delete_employee/${id}`);
        if (result.data.Status) {
          setResults(results.filter(result => result.id !== id));
          window.location.reload()
        } else {
          alert(result.data.Error);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Product List</h3>
      </div>
      <div className="mt-3">
        <div className="input-group">
          <input type="text" id="searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..." />
          <button onClick={handleSearch}>Search</button>
        </div>

      </div>
      <div>
        <div className="buttons">
          <Link to="/dashboard/stylesetup" className="btn">Add Product </Link>
        </div>
      </div>

      <div className="">
        <title>Product Details</title>
        <div className="container">
          {results.map((result, index) => (
            <div className="product-card" key={index}>
              <div className="product-details">
                <h2>Product Name:  <b>{result.prod_name}</b></h2>
                <p>Product Code: <b>{result.prod_code}</b></p>
                <p><b>Standart Cycle time:</b></p>
                <p>Skin: <b>{result.skin}</b> Hours + Case: <b>{result.kase}</b> Hours</p>
                <p></p>
                <p>Total:<b>{result.totalct}</b> Hours</p>
                <p>Category: <b>{result.category}</b></p>
                <p>Released Date:<b>{result.postdate.split('T')[0]}</b></p>
                <p>Remark: {result.remark}</p>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" checked={result.frame}readOnly/>
                    Frame
                  </label>
                  <label>
                    <input type="checkbox" checked={result.print_logo} readOnly />
                    Print Logo
                  </label>
                  <label>
                    <input type="checkbox" checked={result.embroidery}readOnly  />
                    Embroidery
                  </label>
                  <label>
                    <input type="checkbox" checked={result.active}readOnly  />
                    Active 
                  </label>
                </div>
                <div className="pdf-link">
                  <a href={`http://localhost:3000/Teckpacks/` + result.techpack} id="techpack" target="_blank">Download Techpack (PDF)</a>
                </div>
                <div className="buttons">

                <Link to={`/dashboard/EditProduct/` + result.id} className="btn">Edit</Link>
                <a onClick={() => handleDelete(result.id)} className="btn">Delete</a>
                </div>
              </div>
              <div className="product-image">
                <img src={`http://localhost:3000/Images/` + result.image} alt="Product Image" id="image"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Detailstyle;