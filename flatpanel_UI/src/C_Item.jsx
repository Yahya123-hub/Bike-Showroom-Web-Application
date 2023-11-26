import React, { useState} from 'react';
import './C_styles.css';
import styled from 'styled-components';
import PropTypes from 'prop-types'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const RoundedButton = styled.button`
  border-radius: 5px;
  background-color: #0000;
  padding: 1px 10px; /* Adjust padding as needed */
  margin: 1px; /* Add margin if needed */
  cursor: pointer;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

const Item = ({id, name, price, units, category, image}) => {

  const navigate=useNavigate();


  const handleAddToCart = (e) => {
    e.preventDefault();
  
    axios.get('http://localhost:3001/GetCart')
      .then(response => {
        const currentCart = response.data;
        const Cart_isDuplicate = currentCart.some(item => item.BikeID === id);
  
        if (Cart_isDuplicate) {
          window.alert('Item is already in the Cart');
          return;
        }
  
        axios.post('http://localhost:3001/Cart', {              
          BikeID: id,
          name: name,
          price: price,
          updatedprice: price,
          stock: units,
          orderedQuantity: 1
        })
          .then(result => {
            console.log(result);
            window.alert('Added to Cart');
          })
          .catch(error => {
            window.alert('Something went wrong:');
            window.alert(error);
          });
      })
      .catch(error => window.alert('Error fetching data:', error));
    };



  const handleAddToWishlist = (e) => {
    e.preventDefault();
  
    axios.get('http://localhost:3001/GetWishlist')
      .then(response => {
        const currentWishlist = response.data;
        const isDuplicate = currentWishlist.some(item => item.BikeID === id);
  
        if (isDuplicate) {
          window.alert('Item is already in the Wishlist');
          return;
        }
  
        axios.post('http://localhost:3001/Wishlist', {              
          BikeID: id,
          name: name,
          price: price,
          availableQuantity: units
        })
          .then(result => {
            console.log(result);
            window.alert('Added to Wishlist');
          })
          .catch(error => {
            window.alert('Something went wrong:');
            window.alert(error);
          });
      })
      .catch(error => window.alert('Error fetching data:', error));
  };
  
  const handleBuyNow = () => {
    axios.post('http://localhost:3001/Order', {
      items: name,
      grandtotal: price,
    })
    .then(response => {
      console.log(response);
      window.alert('Order Created');
  
      if (units > 0) {
        axios.put(`http://localhost:3001/UpdateStock/${id}`, {
          quantity: units - 1,
        })
        .then(stockUpdateResponse => {
          console.log(stockUpdateResponse);
          navigate('/C_Orders');
        })
        .catch(stockUpdateError => {
          window.alert('Error updating stock:', stockUpdateError);
        });
      } else {
        window.alert('Item is out of stock.');
      }
    })
    .catch(error => window.alert('Error Creating Order:', error));
  };
  
  

  return (
    <div className="product-container">
      <img src={`./src/server/uploads/${image}`}  alt={name} className="product-image" />
      <div className="product-details">
        <h2>Name: {name}</h2>
        <p>Price: Rs.{price}</p>
        <p>Units: {units}</p>
        <p>Category: {category}</p>
        <p>Status: <span className={units > 0 ? 'in-stock' : 'out-of-stock'}>{units > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
        <p>ID: {id}</p>
      </div>
      <div className="product-buttons">
        <RoundedButton onClick={handleAddToCart} disabled={units <= 0}>Cart</RoundedButton>
        <RoundedButton onClick={handleAddToWishlist} disabled={units <= 0}>Wishlist</RoundedButton>
        <RoundedButton onClick={handleBuyNow} disabled={units <= 0}>Buy Now</RoundedButton>
      </div>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  units: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Item;
