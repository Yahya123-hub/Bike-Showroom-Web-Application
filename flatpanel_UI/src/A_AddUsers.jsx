import * as Components from './SignupSigninComponents.jsx';
import React from "react";
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router';


const M_Sell = () => {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState(); 
  const [password, setPassword] = React.useState(); 
  
  const [role, setRole] = React.useState(null); 
  const options = [
    { value: 'option1', label: 'Customer' },
    { value: 'option2', label: 'Admin' },
    { value: 'option3', label: 'Mechanic' },
  ];
  const navigate = useNavigate();

  const SubmitUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/Users', {name,email,password,role:role.label})
    .then(result => {
      console.log(result);
      window.alert('User Added');
      navigate('/A_Users')

    })
    .catch(error => {
      window.alert("Something went wrong:")
      window.alert(error)})  
  };
  
  return (
    <Components.Container_Input>
    <Components.Form onSubmit={SubmitUser} >
    <Components.Title>User Details</Components.Title>
    <Components.Input type='text' placeholder='Name'  value={name} onChange={(e) => setName(e.target.value)} />
    <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}  />
    <Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
    
    <div className='Ucombox'>
      <Select
        value={role}
        onChange={(selectedOption) => setRole(selectedOption)}
        options={options}
        placeholder="Role"
      />
    </div>
    
    <Components.Button>Confirm</Components.Button>
    </Components.Form>
    </Components.Container_Input>
  )
}

export default M_Sell
