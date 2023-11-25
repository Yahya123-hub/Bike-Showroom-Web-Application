import * as Components from './SignupSigninComponents.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const C_Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/GetMechanics')
      .then(response => {
        const mechanicsData = response.data.map(mechanic => ({
          value: mechanic._id,
          label: mechanic.name,
        }));
        setMechanics(mechanicsData);
      })
      .catch(error => {
        console.error('Error fetching mechanics:', error);
      });
  }, []); 

  const handle_feedback = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/Feedback', { mechanicID: selectedMechanic?.value, comment: feedback })
      .then(result => {
        console.log(result);
        window.alert('Thank you for your Feedback');
      })
      .catch(error => {
        window.alert('Something went wrong:');
        window.alert(error);
      });
  };

  return (
    <Components.Container_Input>
      <Components.Form>
        <Components.Title>Give Feedback</Components.Title>
        <Components.Input
          type='text'
          placeholder='Feedback'
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Select
            value={selectedMechanic}
            onChange={(selectedOption) => setSelectedMechanic(selectedOption)}
            options={mechanics}
            placeholder="Choose Mechanic"
            isSearchable={false}
          />
          <Components.Button onClick={handle_feedback}>Submit</Components.Button>
        </div>
      </Components.Form>
    </Components.Container_Input>
  );
};

export default C_Feedback;
