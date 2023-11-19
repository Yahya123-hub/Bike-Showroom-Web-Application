import React from "react";
import * as Components from './SignupSigninComponents.jsx';
import circleImage from './assets/imageedit_9_4143813496.jpg';
import circleImage2 from './assets/imageedit_2_6513138259.jpg';
import './styles.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MDashboard from './Mechanic_Dashboard.jsx';
import CDashboard from './Customer_Dashboard.jsx';
import ADashboard from './Admin_Dashboard.jsx';
import axios from 'axios';
import {userSchema} from "./Validations/RegValidations.js"
import {userLoginSchema} from "./Validations/LoginValidations.js"
import Select from "react-select";
import { useFormik } from "formik";
import * as yup from "yup";



function App() {

      
    const [signIn, toggle] = React.useState(true);
    const options = [
      { value: 'option1', label: 'Customer' },
      { value: 'option2', label: 'Admin' },
      { value: 'option3', label: 'Mechanic' },
    ];
    const navigate=useNavigate();

    const handleSignUp = (values, actions) => {
        // Validation using Yup
        registrationFormik.validateForm(values).then((errors) => {
          if (Object.keys(errors).length === 0) {
            // No validation errors, proceed with form submission
            axios.post('http://localhost:3001/Users', {
              name: values.name,
              email: values.email,
              password: values.password,
              role: values.role.label,
            })
              .then(result => {
                console.log(result);
                window.alert('Account Created');
              })
              .catch(error => {
                window.alert("Something went wrong:")
                window.alert(error);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          } else {
            // Validation errors found, update formik errors
            actions.setErrors(errors);
            actions.setSubmitting(false);
          }
        });
      };
      
      const handleSignIn = async (values, actions) => {
        // Validation using Yup
        loginFormik.validateForm(values).then((errors) => {
          if (Object.keys(errors).length === 0) {
            // No validation errors, proceed with form submission
            axios.post('http://localhost:3001/signin', {
              email: values.semail,
              password: values.spassword,
            })
              .then(response => {
                const userRole = response.data.role;
                console.log(userRole);
                window.alert(`Login successful. User role: ${userRole}`);
                if (userRole === 'Customer') {
                  navigate('/customer-dashboard');
                } else if (userRole === 'Admin') {
                  navigate('/admin-dashboard');
                } else if (userRole === 'Mechanic') {
                  navigate('/mechanic-dashboard');
                }
              })
              .catch(error => {
                window.alert('Invalid Credentials', error);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          } else {
            // Validation errors found, update formik errors
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
          role: null,
        },
        validationSchema: userSchema, 
        onSubmit: handleSignUp,
        validateOnChange: true, // Enable onChange validation
      });
      
      const loginFormik = useFormik({
        initialValues: {
          semail: '',
          spassword: '',
        },
        validationSchema: userLoginSchema, 
        onSubmit: handleSignIn,
        validateOnChange: true, // Enable onChange validation
      });
      
      console.log(loginFormik)

      return (
        <div>
                <Components.Container>
                    <Components.SignUpContainer signinIn={signIn}>
                        <Components.Form onSubmit={handleSignUp}>
                            <Components.Title>Create An Account</Components.Title>
                            <Components.Input type='text' placeholder='Name' value={registrationFormik.values.name} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur} name="name" />
                            {registrationFormik.touched.name && registrationFormik.errors.name && (
                                <p className="error">{registrationFormik.errors.name}</p>
                            )}
                            <Components.Input type='email' placeholder='Email' value={registrationFormik.values.email} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur}   name="email"/>
                            {registrationFormik.touched.email && registrationFormik.errors.email && (
                                <p className="error">{registrationFormik.errors.email}</p>
                            )}
                            <Components.Input type='password' placeholder='Password' value={registrationFormik.values.password} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur} name="password" />
                            {registrationFormik.touched.password && registrationFormik.errors.password && (
                                <p className="error">{registrationFormik.errors.password}</p>
                            )}
                            <div style={{ position: 'relative', width: '380px',marginTop:'10px', marginBottom: '20px'  }}>
                                <Select
                                    value={registrationFormik.values.role} 
                                    onChange={registrationFormik.handleChange} 
                                    onBlur={registrationFormik.handleBlur}
                                    name="role"
                                    options={options}
                                    placeholder="Role"
                                    isSearchable={false} //assign a default value 
                                />
                            </div>
                            

                            
                            <Components.Button onClick={handleSignUp} >Sign Up</Components.Button>
                        </Components.Form>
                    </Components.SignUpContainer>

                    <Components.SignInContainer signinIn={signIn}>
                        <Components.Form>
                            <Components.Title>Bike Showroom</Components.Title>
                            <Components.Input type='email' placeholder='Email' value={loginFormik.values.semail} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur}  name="semail" />
                            {loginFormik.touched.semail && loginFormik.errors.semail && (
                                <p className="error2">{loginFormik.errors.semail}</p>
                            )}
                            <Components.Input type='password' placeholder='Password'  value={loginFormik.values.spassword} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur}  name="spassword" />
                            {loginFormik.touched.spassword && loginFormik.errors.spassword && (
                                <p className="error2">{loginFormik.errors.spassword}</p>
                            )}
                            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                                <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
                        </Components.Form>
                    </Components.SignInContainer>

                    <Components.OverlayContainer signinIn={signIn}>
                        <Components.Overlay signinIn={signIn}>
                            <Components.LeftOverlayPanel signinIn={signIn}>
                                <Components.BackgroundImage src={circleImage} alt="" />
                                <Components.Title>Already Registered?</Components.Title>
                                <Components.Paragraph>
                                    Please login with your personal info
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(true)}>
                                    Sign In
                                </Components.GhostButton>
                            </Components.LeftOverlayPanel>

                            <Components.RightOverlayPanel signinIn={signIn}>
                                <Components.BackgroundImage src={circleImage2} alt="" />
                                <Components.Title>Get started with us,</Components.Title>
                                <Components.Paragraph>
                                    Register to start your journey with us
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(false)}>
                                    Sign Up
                                </Components.GhostButton>
                            </Components.RightOverlayPanel>
                        </Components.Overlay>
                    </Components.OverlayContainer>
                </Components.Container>

            <Routes>
                <Route path="/customer-dashboard" element={<CDashboard />} />
                <Route path="/admin-dashboard" element={<ADashboard />} />
                <Route path="/mechanic-dashboard" element={<MDashboard />} />
            </Routes>
        </div>
    );
}

export default App;
