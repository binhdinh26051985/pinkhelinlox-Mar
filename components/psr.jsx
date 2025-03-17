import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ordplan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sapOptions, setSapOptions] = useState([]);

  // Fetch orders based on search query
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/auth/api/search-orders?searchQuery=${searchQuery}`
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch SAP options on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/auth/viewprodcolor')
      .then(response => {
        setSapOptions(response.data);
      })
      .catch(error => console.error('Error fetching product colors:', error));
  }, []);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  // Handle changes in order fields
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOrders = [...orders];
    updatedOrders[index] = { ...updatedOrders[index], [name]: value };
    setOrders(updatedOrders);
  };

  // Handle bulk update submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/auth/api/bulk-update-records",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orders }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error updating records:", error);
    }
  };

  // Filter orders where delivery date has not passed
  const currentDate = new Date().toISOString().split('T')[0];
  const filteredOrders = orders.filter(order => {
    const deliveryDate = order.delivery ? order.delivery.split('T')[0] : '';
    return deliveryDate >= currentDate;
  });

  return (
    <div className="po-search-container">
      <h1>Order Plan</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      <form onSubmit={handleSubmit}>
        {filteredOrders.length > 0 && (
          <div className="orders-list">
            {filteredOrders.map((order, index) => {
              const sapData = sapOptions.find(option => option.SAP_id === order.sap);
              return (
                <div key={order.id} className="order-item">
                  <div className="order-field">
                    <label>Order type</label>
                    <input type="text" name="factory" value={order.factory} readOnly />
                    <input type="text" name="orderType" value={order.orderType} readOnly />
                    <input type="text" name="season" value={order.season} readOnly />
                    <input type="text" name="orderCycle" value={order.orderCycle} readOnly />
                    <input type="text" name="destination" value={order.destination} readOnly />
                    <label>SAP</label>
                    <input type="text" name="sap" value={order.sap} readOnly />
                  </div>

                  <div className="order-field">
                    <label>Product</label>
                    <input type="text" name="product" value={order.product} readOnly />
                    <label>Color</label>
                    <input type="text" name="color" value={order.color} readOnly />
                    <label>Qty</label>
                    <input type="number" name="qty" value={order.qty} readOnly />
                    <label>Delivery</label>
                    <input
                      type="date"
                      name="delivery"
                      value={order.delivery ? order.delivery.split("T")[0] : ""}
                      readOnly
                    />
                    <label>Remark</label>
                    <input
                      type="text"
                      name="planmark"
                      value={order.planmark || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>

                  <div className="order-field">
                    <label>Mat_ETA</label>
                    <input
                      type="date"
                      name="mat_eta"
                      value={order.mat_eta ? order.mat_eta.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>PPM Plan</label>
                    <input
                      type="date"
                      name="ppm"
                      value={order.ppm ? order.ppm.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Cut Plan</label>
                    <input
                      type="date"
                      name="cut"
                      value={order.cut ? order.cut.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Print/Emb Plan</label>
                    <input
                      type="date"
                      name="print_emb"
                      value={order.print_emb ? order.print_emb.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div className="order-field">
                    <label>Mat_Ready</label>
                    <input
                      type="date"
                      name="mat_done"
                      value={order.mat_done ? order.mat_done.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>PPS Approval</label>
                    <input
                      type="date"
                      name="ppmdone"
                      value={order.ppmdone ? order.ppmdone.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Cut Actual</label>
                    <input
                      type="date"
                      name="cutdone"
                      value={order.cutdone ? order.cutdone.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Print/Emb Actual</label>
                    <input
                      type="date"
                      name="print_embdone"
                      value={order.print_embdone ? order.print_embdone.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>

                  <div className="order-field">
                    <label>Skinhrs</label>
                    <input type="text" name="skin" value={sapData ? sapData.skin : ''} readOnly />
                    <label>Skin Loc</label>
                    <input
                      type="text"
                      name="skinloc"
                      value={order.skinloc}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Line</label>
                    <input
                      type="text"
                      name="skinline"
                      value={order.skinline}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Sewers</label>
                    <input
                      type="number"
                      name="skinsewer"
                      value={order.skinsewer}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Hours/Day</label>
                    <input
                      type="number"
                      name="skinworkhrs"
                      value={order.skinworkhrs}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Input</label>
                    <input
                      type="date"
                      name="skinput"
                      value={order.skinput ? order.skinput.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Output</label>
                    <input
                      type="date"
                      name="skinouput"
                      value={order.skinouput ? order.skinouput.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div className="order-field">
                    <label>Casehrs</label>
                    <input type="text" name="kase" value={sapData ? sapData.kase : ''} readOnly />
                    <label>Case Loc</label>
                    <input
                      type="text"
                      name="kaseloc"
                      value={order.kaseloc}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Line</label>
                    <input
                      type="text"
                      name="kaseline"
                      value={order.kaseline}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Sewers</label>
                    <input
                      type="number"
                      name="kasesewers"
                      value={order.kasesewers}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Hours/Day</label>
                    <input
                      type="number"
                      name="kaseworkhrs"
                      value={order.kaseworkhrs}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Input</label>
                    <input
                      type="date"
                      name="kaseinput"
                      value={order.kaseinput ? order.kaseinput.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Output</label>
                    <input
                      type="date"
                      name="kaseouput"
                      value={order.kaseouput ? order.kaseouput.split("T")[0] : ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Ordplan;