import * as Components from './SignupSigninComponents.jsx';
import React from "react";
import axios from 'axios';
import { useFormik } from "formik";
import * as yup from "yup";

const M_Apply = () => {
  const validationSchema = yup.object({
    name: yup.string()
    .required('Name is required')
    .max(50, 'Name must be at most 50 characters'),
    contact: yup.string()
    .matches(/^0[0-9]{10}$/, 'Invalid contact number. Must start with 0 and be 11 digits.')
    .required('Contact Number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const handleM_Apply = (e, values, actions) => {
    e.preventDefault();
    axios.post('http://localhost:3001/Mechanics', {name: values.name, contact: values.contact, email: values.email})
      .then(result => {
        console.log(result);
        window.alert('Application Filled');
        // one mechanic can only fill application once
      })
      .catch(error => {
        window.alert("Something went wrong:")
        window.alert(error);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      contact: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleM_Apply,
  });



  console.log(formik)
  return (
    <Components.Container_Input>
      <Components.Form>
        <Components.Title>Enter Details</Components.Title>
        <Components.Input type='text' placeholder='Name' {...formik.getFieldProps('name')} />
        {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}
        <Components.Input type='tel' placeholder='Contact Number' {...formik.getFieldProps('contact')} />
        {formik.touched.contact && formik.errors.contact && <p className="error">{formik.errors.contact}</p>}
        <Components.Input type='email' placeholder='Email' {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}
        <Components.Button 
        onClick={(e) => handleM_Apply(e,formik.values, formik)}
        disabled={Object.keys(formik.errors).length > 0 || formik.isSubmitting}
        >Submit Application
        </Components.Button>
      </Components.Form>
    </Components.Container_Input>
  )
}

export default M_Apply;
