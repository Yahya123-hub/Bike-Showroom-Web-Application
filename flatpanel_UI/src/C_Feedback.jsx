import * as Components from './SignupSigninComponents.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as yup from 'yup';

const C_Feedback = () => {
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
        if (mechanicsData.length > 0) {
          setSelectedMechanic(mechanicsData[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching mechanics:', error);
      });
  }, []);

  const validationSchema = yup.object({
    feedback: yup.string()
      .required('Feedback is required')
      .max(50, 'Feedback must be at most 50 characters')
      .matches(/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/, 'Feedback can only contain letters, numbers, and spaces, but not at the beginning or end'),
  });
  

  const formik = useFormik({
    initialValues: {
      feedback: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post('http://localhost:3001/Feedback', {
        mechanicID: selectedMechanic?.value,
        comment: values.feedback,
      })
        .then(result => {
          console.log(result);
          window.alert('Thank you for your Feedback');
          formik.resetForm();
        })
        .catch(error => {
          window.alert('Something went wrong:');
          window.alert(error);
        });
    },
  });

  return (
    <Components.Container_Input>
      <Components.Form onSubmit={formik.handleSubmit}>
        <Components.Title>Give Feedback</Components.Title>
        <Components.Input
          type='text'
          placeholder='Feedback'
          value={formik.values.feedback}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="feedback"
        />
        {formik.touched.feedback && formik.errors.feedback && (
          <p className="error">{formik.errors.feedback}</p>
        )}
        <div style={{ display: 'flex', gap: '10px' }}>
          <Select
            value={selectedMechanic}
            onChange={(selectedOption) => setSelectedMechanic(selectedOption)}
            options={mechanics}
            placeholder="Choose Mechanic"
            isSearchable={false}
          />
          <Components.Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>Submit</Components.Button>
        </div>
      </Components.Form>
    </Components.Container_Input>
  );
};

export default C_Feedback;
