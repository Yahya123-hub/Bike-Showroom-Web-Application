import * as Components from './SignupSigninComponents.jsx';
import React from "react";
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router';
import {userSchema} from "./Validations/RegValidations.js"
import { useFormik } from "formik";




const A_AddUsers = () => {

  const [showRPassword, setShowRPassword] = React.useState(false);

  const options = [
    { value: 'Customer', label: 'Customer' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Mechanic', label: 'Mechanic' },
  ];
  const navigate = useNavigate();

  const SubmitUser = (e, values, actions) => {
    e.preventDefault();
  
    registrationFormik.validateForm(values).then((errors) => {
      if (Object.keys(errors).length === 0) {

        axios.get(`http://localhost:3001/CheckUsers?email=${values.email}`)
        .then(response => {
          if (response.data.message === 'Email is already in use') {
            actions.setErrors({ email: 'Email is already in use' });
            actions.setSubmitting(false);
          } else {
            axios.post('http://localhost:3001/Users', {
              name: values.name,
              email: values.email,
              password: values.password,
              role: values.role,
            })
              .then(result => {
                console.log(result);
                console.log(values.role.value)
                window.alert('Account Created');
                window.location.reload();
              })
              .catch(error => {
                window.alert('Something went wrong:');
                window.alert(error);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }
        })
        .catch(error => {
          window.alert('Error checking email availability:', error);
          actions.setSubmitting(false);
        });

      } else {
        actions.setErrors(errors);
        actions.setSubmitting(false);
      }
    });
  };

  const registrationFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: options[0].value, 
    },
    validationSchema: userSchema, 
    onSubmit: SubmitUser,
    validateOnChange: true, 
  });
  
  return (
    <Components.Container_Input>
    <Components.Form >
    <Components.Title>User Details</Components.Title>
    <Components.Input type='text' placeholder='Name' value={registrationFormik.values.name} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur} name="name" />
    {registrationFormik.touched.name && registrationFormik.errors.name && (
    <p className="error">{registrationFormik.errors.name}</p>
    )}
    <Components.Input type='email' placeholder='Email' value={registrationFormik.values.email} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur}   name="email"/>
    {registrationFormik.touched.email && registrationFormik.errors.email && (
    <p className="error">{registrationFormik.errors.email}</p>
    )}
    <Components.Input type={showRPassword ? 'text' : 'password'} placeholder='Password' value={registrationFormik.values.password} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur} name="password" />
    {registrationFormik.touched.password && registrationFormik.errors.password && (
    <p className="error">{registrationFormik.errors.password}</p>)}

    <div style={{ marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
    <label style={{ marginLeft: '5px' }}>
    Show Password
    <input
    type="checkbox"
    checked={showRPassword}
    onChange={() => setShowRPassword(!showRPassword)}
    />
    </label>
    </div>

    <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      <Select
        value={options.find(option => option.value === registrationFormik.values.role)}
        onChange={(selectedOption) => registrationFormik.setFieldValue("role", selectedOption.value)}
        onBlur={registrationFormik.handleBlur}
        name="role"
        options={options}
        placeholder="Role"
        isSearchable={false}
      />
    </div>

    
    <div style={{ marginTop: '15px' }}>
    <Components.Button
    
    onClick={(e) => SubmitUser(e, registrationFormik.values, registrationFormik)}
    disabled={Object.keys(registrationFormik.errors).length > 0 || registrationFormik.isSubmitting}
    >
    Confirm
    </Components.Button>
    </div>

    </Components.Form>
    </Components.Container_Input>
  )
}

export default A_AddUsers

