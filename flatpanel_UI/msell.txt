import * as Components from './SignupSigninComponents.jsx';
import React from "react";
import axios from 'axios';
import Select from 'react-select';

const M_Sell = () => {

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(); 
  const [availableQuantity, setAvailableQuantity] = React.useState(); 
  const [category, setCategory] = React.useState(null); 
  const options = [
    { value: 'option1', label: 'Heavy Bike' },
    { value: 'option2', label: 'Dirt Bike' },
    { value: 'option3', label: 'Mountain Bike' },
  ];
  const [Image, setImage] = React.useState(null);
  const [ImagePreview, setImagePreview] = React.useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }
    setImage(file);
  };

  const SubmitBike = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('availableQuantity', availableQuantity);
    formData.append('category', category.label);
    formData.append('Image', Image);
  
    axios.post('http://localhost:3001/Bikes', formData)
    .then(result => {
      console.log(result);
      window.alert('Bike Listed');
    })
    .catch(error => {
      window.alert("Something went wrong:")
      window.alert(error)})  
  };
  
  return (
    <Components.Container_Input>
    <Components.Form onSubmit={SubmitBike} encType="multipart/form-data">
    <Components.Title>Bike Details</Components.Title>
    <Components.Input type='text' placeholder='Name'  value={name} onChange={(e) => setName(e.target.value)} />
    <Components.Input type='number' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)}  />
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

    <Components.Button>Confirm</Components.Button>
    </Components.Form>
    </Components.Container_Input>
  )
}

export default M_Sell
