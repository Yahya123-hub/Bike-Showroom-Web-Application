import React from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import * as Components from './SignupSigninComponents.jsx';
import { Link } from "react-router-dom";


const C_Cart = () => {
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

  const handleAdd = (id, stock, orderedQuantity,price) => {
    
    if (orderedQuantity < stock) {
      axios.put(`http://localhost:3001/IncCart/${id}`)
        .then(response => {
          const updatedCart = cart.map(cartItem =>
            cartItem._id === id
              ? {
                  ...cartItem,
                  orderedQuantity: cartItem.orderedQuantity + 1,
                  updatedprice:  (cartItem.orderedQuantity+1) * price,

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
  
  
  const handleReduce = (id,orderedQuantity,price) => {
    if (orderedQuantity >0) {
      axios.put(`http://localhost:3001/DecCart/${id}`)
        .then(response => {
          const updatedCart = cart.map(cartItem =>
            cartItem._id === id
              ? {
                  ...cartItem,
                  orderedQuantity: cartItem.orderedQuantity - 1,
                  updatedprice:  (cartItem.orderedQuantity-1) * price,
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

  const Checkout = () => {
    
    const updateStock = (cart) => {
      cart.forEach(item => {
        axios.get(`http://localhost:3001/GetStock/${item.BikeID}`)
          .then(stockResponse => {
            const currentStock = stockResponse.data.quantity;
  
            const updatedStock = currentStock - item.orderedQuantity;
  
            axios.put(`http://localhost:3001/UpdateStock/${item.BikeID}`, {
              quantity: updatedStock
            })
              .then(updateResponse => {
                console.log(updateResponse);
              })
              .catch(updateError => {
                console.error('Error updating stock in database:', updateError);
              });
          })
          .catch(stockError => {
            console.error('Error fetching stock from database:', stockError);
          });
      });
    };
  
    axios.get('http://localhost:3001/GetCart')
      .then(response => {
        setCart(response.data);
        setRecords(response.data);
      })
      .catch(error => window.alert('Error fetching data:', error));
  
    const total = cart.reduce((acc, item) => acc + item.updatedprice, 0);
    const itemNames = cart.map(item => item.name).join(', ');
  
    axios.post('http://localhost:3001/Order', {
      items: itemNames,
      grandtotal: total,
    })
      .then(response => {
        console.log(response);
        window.alert('Order Created, Cart Will be Cleared');
  
        updateStock(cart);
  
        setCart([]);
        setRecords([]);
  
        axios.delete('http://localhost:3001/ClearCart')
          .then(deleteResponse => {
            console.log(deleteResponse);
          })
          .catch(deleteError => {
            console.error('Error clearing cart from database:', deleteError);
          });
      })
      .catch(error => window.alert('Error Creating Order:', error));
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
      name: "New Price",
      selector: row => row.updatedprice,
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
            onClick={(e) => handleReduce(row._id,row.orderedQuantity,row.price)}
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
        onClick={Checkout}
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

export default C_Cart;

