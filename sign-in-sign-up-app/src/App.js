import React from "react";
import * as Components from './Components';
import circleImage from './assets/imageedit_9_4143813496.jpg';
import circleImage2 from './assets/imageedit_2_6513138259.jpg';



function App() {
    const [signIn, toggle] = React.useState(true);
     return(

         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='Name' />
                     <Components.Input type='email' placeholder='Email' />
                     <Components.Input type='password' placeholder='Password' />
                     <Components.Input type='role' placeholder='Role' />
                     <Components.Button>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title>Bike Showroom</Components.Title>
                      <Components.Input type='email' placeholder='Email' />
                      <Components.Input type='password' placeholder='Password' />
                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      {/*<Link to="/signin">*/}
                        <Components.Button onClick={() => toggle(true)}>
                            Sign In
                        </Components.Button>
                       {/* </Link>*/}
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                  <Components.BackgroundImage src={circleImage} alt="" />  
                     <Components.Title>Already Registered?</Components.Title>
                     <Components.Paragraph>
                     Please log in using your personal information.
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                   </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                     <Components.BackgroundImage src={circleImage2} alt="" />
                       <Components.Title>Get started with us,</Components.Title>
                       <Components.Paragraph>
                           Register to start your journey with us.
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sign Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>
         </Components.Container>  
     )
}

export default App;