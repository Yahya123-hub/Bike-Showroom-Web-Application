import * as Components from './SignupSigninComponents.jsx';
import React from "react";
import axios from 'axios';

const M_Apply = () => {

  const [name, setName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleM_Apply = (e) => { 
    e.preventDefault();
    axios.post('http://localhost:3001/Mechanics', {name,contact,email})
        .then(result => {
          console.log(result);
          window.alert('Application Filled');
          //one mechanic can only fill aplication once
        })
        .catch(error => {
          window.alert("Something went wrong:")
          window.alert(error)})               
  };


  return (
      <Components.Container_Input>
      <Components.Form>
      <Components.Title>Enter Details</Components.Title>
      <Components.Input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
      <Components.Input type='tel' placeholder='Contact Number' value={contact} onChange={(e) => setContact(e.target.value)} />
      <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Components.Button onClick={handleM_Apply}>Submit Application</Components.Button>
      </Components.Form>
      </Components.Container_Input>
  )
}

export default M_Apply
