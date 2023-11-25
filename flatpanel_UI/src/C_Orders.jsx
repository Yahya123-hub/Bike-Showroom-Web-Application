import React from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import * as Components from './SignupSigninComponents.jsx';
import { Link } from "react-router-dom";


const C_Orders = () => {
  const [records, setRecords] = React.useState([]);
  const [orders, setOrders] = React.useState([]);


  function tblsearch(event) {
    const newdata = orders.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newdata);
  }

  React.useEffect(() => {
    axios.get('http://localhost:3001/GetOrders')
      .then(response => {
        const nonDeliveredOrders = response.data.filter(order => order.status !== 'Delivered');
        setOrders(nonDeliveredOrders);
        setRecords(nonDeliveredOrders);
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/DeleteOrder/'+id)
    .then(res => {console.log(res)
      window.location.reload()})
    .catch(error => window.alert('Error deleting data:', error));
  };

  const Card = (id) => {
    axios.put(`http://localhost:3001/Card/${id}`)
    .then(response => {
      const updatedOrder = orders.map(order => 
        order._id === id ? { ...order, paymentmethod: 'Card' } : order
      );
      setOrders(updatedOrder);
      setRecords(updatedOrder);
    })
    .catch(error => window.alert('Error Updating Order:', error));
  }

  const Cash = (id) => {
    axios.put(`http://localhost:3001/Cash/${id}`)
    .then(response => {
      const updatedOrder = orders.map(order => 
        order._id === id ? { ...order, paymentmethod: 'Cash' } : order
      );
      setOrders(updatedOrder);
      setRecords(updatedOrder);
    })
    .catch(error => window.alert('Error Updating Order:', error));
  }

  const Confirm = (id) => {
    axios.put(`http://localhost:3001/Confirm/${id}`)
      .then(response => {
        const updatedOrder = orders.map(order => 
          order._id === id ? { ...order, status: 'Delivered' } : order
        );
        setOrders(updatedOrder);
        setRecords(updatedOrder);
        window.alert("Order Delivered, Check in Payments History")
  
        axios.post('http://localhost:3001/Payment', {
          OrderID: id, 
          payed_amount: updatedOrder.find(order => order._id === id).grandtotal,
          payment_method: updatedOrder.find(order => order._id === id).paymentmethod 
        })
          .then(paymentResponse => {
            console.log(paymentResponse);
          })
          .catch(paymentError => {
            console.error('Error :', paymentError);
          });
      })
      .catch(error => window.alert('Error Updating Order:', error));
  };
  

  const columns = [
    {
      name: "Order ID",
      selector: row => row._id,
      sortable: true,
    },
    {
      name: "Items",
      selector: row => row.items,
      sortable: true,
    },
    {
      name: "GrandTotal",
      selector: row => row.grandtotal,
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: row => row.paymentmethod,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: row => (
        <div>

          <button
            style={{
              borderRadius: '20px', 
              border: '#000', 
              padding: '5px 10px',
              backgroundColor: '#d3d3d3',
              
            }}
            onClick={(e) => Confirm(row._id)}
            disabled={row.status === 'Delivered'}
          >
            <span style={{ color: '#000' }}>Confirm</span>
          </button>
          <button
            style={{
              borderRadius: '20px', 
              border: '#000', 
              padding: '5px 10px',
              backgroundColor: '#d3d3d3',
              
            }}
            onClick={(e) => Cash(row._id)}
            disabled={row.status === 'Delivered'}

          >
            <span style={{ color: '#000' }}>Cash</span>
          </button>

          <button
            style={{
              borderRadius: '20px', 
              border: '#000', 
              padding: '5px 10px',
              backgroundColor: '#d3d3d3',
              
            }}
            onClick={(e) => Card(row._id)}
            disabled={row.status === 'Delivered'} 

          >
            <span style={{ color: '#000' }}>Card</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="wishlist_tbl">
      <Components.Title style={{ textAlign: 'center',  }}>Orders</Components.Title>
      <div className="wishlist_tbl_srch" ><input type="text" placeholder="Search" onChange={tblsearch}  style={{ width: '60px' }}></input></div>
      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
        paginationPerPage={5}
      />
    </div>
  );
};

export default C_Orders;

