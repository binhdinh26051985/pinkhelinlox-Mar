import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Destination = () => {
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [values, setValues] = useState({
    dest: '',
    remark: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/auth/add_destiny', values)
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
    axios.get("http://localhost:3000/auth/destiny")
      .then((result) => {
        setTypes(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredTypes = types.filter(type =>
    type.dest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=''>
      <div className="d-flex justify-content-center">
        <h3>FG Destination</h3>
      </div>
      <section className="flex-container">
        <div className="item pri flex-item">
          <div className="mt-3">
            <input
              type="text"
              placeholder="Search Destination"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-3"
            />        
            <table className="table">
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {filteredTypes.map((e) => (
                  <tr key={e.dest}>
                    <td>{e.dest}</td>
                    <td>{e.remark}</td>
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
                <h2>New Destination</h2>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <input type="text" name='dest' autoComplete='off' placeholder='Destination'
                      onChange={(e) => setValues({ ...values, dest: e.target.value })} className='form-control rounded-0' />
                  </div>
                  <div className='mb-3'>
                    <input type="text" name='remark' placeholder='remark'
                      onChange={(e) => setValues({ ...values, remark: e.target.value })} className='form-control rounded-0' />
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

export default Destination;