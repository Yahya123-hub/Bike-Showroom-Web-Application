import * as Components from './SignupSigninComponents.jsx';
import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required').positive('Price must be a positive number').moreThan(0, 'Price must be greater than zero'),
  availableQuantity: yup.number().required('Available Quantity is required').positive('Quantity must be a positive number').moreThan(0, 'Quantity must be greater than zero'),
});

const M_Sell = () => {
  const options = [
    { value: 'Heavy Bike', label: 'Heavy Bike' },
    { value: 'Dirt Bike', label: 'Dirt Bike' },
    { value: 'Mountain Bike', label: 'Mountain Bike' },
  ];
  const [Image, setImage] = React.useState(null);
  const [ImagePreview, setImagePreview] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      availableQuantity: '',
      category:  options[0].value,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!Image) {
        window.alert('Please select an Image for the bike.');
        return; 
      }
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('availableQuantity', values.availableQuantity);
      formData.append('category', values.category);
      formData.append('Image', Image);

      axios.post('http://localhost:3001/Bikes', formData)
        .then(result => {
          console.log(result);
          window.alert('Bike Listed');
          window.location.reload();

          //formik.resetForm();
          //setImage(null);
          //setImagePreview(null);
        })
        .catch(error => {
          window.alert('Something went wrong:');
          window.alert(error);
          
        });
    },
  });

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


  console.log(formik)
  return (
    <Components.Container_Input>
      <Components.Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Components.Title>Bike Details</Components.Title>
        <Components.Input
          type='text'
          placeholder='Name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="name"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="error">{formik.errors.name}</p>
        )}
        <Components.Input
          type='number'
          placeholder='Price'
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="price"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="error">{formik.errors.price}</p>
        )}
        <Components.Input
          type='number'
          placeholder='Available Quantity'
          value={formik.values.availableQuantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="availableQuantity"
        />
        {formik.touched.availableQuantity && formik.errors.availableQuantity && (
          <p className="error">{formik.errors.availableQuantity}</p>
        )}

        <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Select
            value={options.find(option => option.value === formik.values.category)}
            onChange={(selectedOption) => formik.setFieldValue('category', selectedOption)}
            onBlur={formik.handleBlur}
            options={options}
            placeholder="Category"
            isSearchable={false}
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

        <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Components.Button 
        disabled={Object.keys(formik.errors).length > 0 || formik.isSubmitting}
        >
        Confirm
        </Components.Button>
        </div>
      </Components.Form>
    </Components.Container_Input>
  );
}

export default M_Sell;
