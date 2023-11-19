import React from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import * as Components from './SignupSigninComponents.jsx';
import { Link } from "react-router-dom";


const C_Wishlist = () => {
  const [records, setRecords] = React.useState([]);
  const [cart, setCart] = React.useState([]);

  function tblsearch(event) {
    const newdata = cart.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newdata);
  }

  React.useEffect(() => {
    axios.get('http://localhost:3001/GetCart')
      .then(response => {
        setCart(response.data);
        setRecords(response.data);
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, []); 

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/DeleteCart/'+id)
    .then(res => {console.log(res)
      window.location.reload()})
    .catch(error => window.alert('Error deleting data:', error));
  };

  const handleAdd = (id, stock, orderedQuantity, fprice) => {
    
    if (orderedQuantity < stock) {
      axios.put(`http://localhost:3001/IncCart/${id}`)
        .then(response => {
          const updatedCart = cart.map(cartItem =>
            cartItem._id === id
              ? {
                  ...cartItem,
                  orderedQuantity: cartItem.orderedQuantity + 1,
                  price: (cartItem.orderedQuantity+1) * fprice,
                }
              : cartItem
          );
          setCart(updatedCart);
          setRecords(updatedCart);
        })
        .catch(error => window.alert('Error Incrementing in Cart:', error));
    } else {
      window.alert("Ordered Quantity can't be more than stock");
    }
  };
  
  
  const handleReduce = (id, stock, orderedQuantity, fprice) => {
    if (orderedQuantity >0) {
      axios.put(`http://localhost:3001/DecCart/${id}`)
        .then(response => {
          const updatedCart = cart.map(cartItem =>
            cartItem._id === id
              ? {
                  ...cartItem,
                  orderedQuantity: cartItem.orderedQuantity - 1,
                  price: (cartItem.orderedQuantity-1) * fprice,
                }
              : cartItem
          );
          setCart(updatedCart);
          setRecords(updatedCart);
        })
        .catch(error => window.alert('Error Decrementing in Cart:', error));
    } else {
      window.alert("Ordered Quantity can't be negative");
    }
  };
  

  const columns = [
    {
      name: "BikeID",
      selector: row => row.BikeID,
      sortable: true,
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: row => row.price,
      sortable: true,
    },
    {
      name: "Stock",
      selector: row => row.stock,
      sortable: true,
    },
    {
      name: "Ordered",
      selector: row => row.orderedQuantity,
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
              marginRight: '5px', 
            }}
            onClick={(e) => handleDelete(row._id)}
          >
            <span style={{ color: '#000' }}>Delete</span>
          </button>

          <button
            style={{
              borderRadius: '20px',
              border: '#000',
              padding: '5px 10px',
              backgroundColor: '#d3d3d3',
              marginRight: '5px', 
            }}
            onClick={(e) => handleAdd(row._id,row.stock,row.orderedQuantity,row.price)}
          >
            <span style={{ color: '#000' }}>+</span>
          </button>

          <button
            style={{
              borderRadius: '20px',
              border: '#000',
              padding: '5px 10px',
              backgroundColor: '#d3d3d3',
            }}
            onClick={(e) => handleReduce(row._id,row.stock,row.orderedQuantity,row.price)}
          >
            <span style={{ color: '#000' }}>-</span>
          </button>
        </div>

      ),
    },
  ];

  return (
    <div className="wishlist_tbl">
      <Components.Title style={{ textAlign: 'center',  }}>Cart</Components.Title>
      <div className="wishlist_tbl_srch" ><input type="text" placeholder="Search" onChange={tblsearch}  style={{ width: '60px' }}></input></div>
      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
        paginationPerPage={5}
      />
      <Components.Button
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      >
        Checkout
      </Components.Button>
    </div>
  );
};

export default C_Wishlist;
