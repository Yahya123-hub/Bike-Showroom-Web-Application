import * as Components from './SignupSigninComponents.jsx';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';

const M_Sell = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(); 
  const [availableQuantity, setAvailableQuantity] = useState(); 
  const [category, setCategory] = useState(null); 
  const options = [
    { label: 'Heavy Bike', value: 'Heavy Bike' },
    { label: 'Dirt Bike', value: 'Dirt Bike' },
    { label: 'Mountain Bike', value: 'Mountain Bike' },
  ];  
  const [Image, setImage] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  const [bikes, setBikes] = React.useState([]);


  useEffect(() => {
    axios.get(`http://localhost:3001/GetBikes/${id}`)
      .then(response => {
        setName(response.data.name);
        setPrice(response.data.price);
        setAvailableQuantity(response.data.availableQuantity);
        const selectedCategory = options.find(option => option.label === response.data.category);
        setCategory(selectedCategory);
        setImage(response.data.Image);
        const ImgPath = `/src/server/uploads/${response.data.Image}`;
        setImagePreview(ImgPath); 
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }
    setImage(file);
  };

  /*const handleDisapproval = (id) => {
    axios.put(`http://localhost:3001/DisapproveMechanic/${id}`)
      .then(response => {
        const updatedMechanics = mechanics.map(mechanic => 
          mechanic._id === id ? { ...mechanic, isApproved: false } : mechanic
        );
        setMechanics(updatedMechanics);
        setRecords(updatedMechanics);
      })
      .catch(error => window.alert('Error disapproving mechanic:', error));
  };*/


  const UpdateBike = (id,e) => {
    e.preventDefault();  
    const formDataUpdate = new FormData();
    formDataUpdate.append('name', name);
    formDataUpdate.append('price', price);
    formDataUpdate.append('availableQuantity', availableQuantity);
    formDataUpdate.append('category', category.label);
    formDataUpdate.append('Image', Image);
  
    axios.put(`http://localhost:3001/UpdateBikes/${id}`, formDataUpdate, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(result => {
        
        /*const updatedBikes = bikes.map(bike => 
          bike._id === id ? { ...bike, 
            name: result.data.name, 
            price: result.data.price,
            availableQuantity: result.data.availableQuantity,
            category: result.data.category,
            Image: result.data.Image,
          } : bike
        );
        setBikes(updatedBikes);*/
        console.log(result);
        window.alert('Bike Updated');
        navigate('/M_Listings');
      })
      .catch(error => {
        console.error('Update error:', error);
        window.alert('Something went wrong');
      });
  };
  
  
  return (
    <Components.Container_Input>
      <Components.Form onSubmit={(e) => UpdateBike(id, e)} encType="multipart/form-data">
        <Components.Title>Update Bike Details</Components.Title>
        <Components.Input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <Components.Input type='number' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
        <Components.Input type='number' placeholder='Available Quantity' value={availableQuantity} onChange={(e) => setAvailableQuantity(e.target.value)} />
        
        <div className='combox'>
          <Select
            value={category}
            onChange={(selectedOption) => setCategory(selectedOption)}
            options={options}
            placeholder="Category"
          />
        </div>
        
        <div className='imgpicker'>
          <div className='img'>
            {ImagePreview && (
              <img
                src={ImagePreview}
                alt="Selected"
                style={{ maxWidth: '100%', maxHeight: '100px', margin: '10px 0', float: 'left' }}
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name="Image"
          />
        </div>
  
        <Components.Button>Update</Components.Button>
      </Components.Form>
    </Components.Container_Input>
  );
}

export default M_Sell;
