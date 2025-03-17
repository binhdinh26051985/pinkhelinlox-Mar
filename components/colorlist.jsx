import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Colorlist = () => {
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [values, setValues] = useState({
    color_name: '',
    pantone: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/auth/add_color', values)
    .then(result => {
      if(result.data.Status) {
          window.location.reload()
      } else {
          alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get("http://localhost:3000/auth/colorlist")
      .then((result) => {
        setTypes(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredTypes = types.filter(type =>
    type.color_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=''>
      <div className="d-flex justify-content-center">
        <h3>Color List</h3>
      </div>
      <section className="flex-container">
        <div className="item pri flex-item">
          <div className="mt-3">
            <input
              type="text"
              placeholder="Search color name"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-3"
            />        
            <table className="table">
              <thead>
                <tr>
                  <th>Color name</th>
                  <th>Pantone</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredTypes.map((e) => (
                  <tr key={e.color_name}>
                    <td>{e.color_name}</td>
                    <td>{e.pantone}</td>
                    <td>...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="item sec flex-item">
          <div className=''>
            <div className='d-flex justify-content'>
              <div className=''>
                <h2>Add New Color</h2>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <input type="text" name='color_name' autoComplete='off' placeholder='Input color name'
                      onChange={(e) => setValues({ ...values, color_name: e.target.value })} className='form-control rounded-0' />
                  </div>
                  <div className='mb-3'>
                    <input type="text" name='pantone' placeholder='Input pantone'
                      onChange={(e) => setValues({ ...values, pantone: e.target.value })} className='form-control rounded-0' />
                  </div>
                  <button className='btn btn-success w-100 rounded-0 mb-2'>Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Colorlist;