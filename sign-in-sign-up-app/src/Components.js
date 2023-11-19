import styled from 'styled-components';

export const Container = styled.div`   //outer most container which holds all other components
background-color: #fff;
border-radius: 10px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
width: 900px;
max-width: 200%;
min-height: 430px;

`;

export const CircularImage = styled.img`
width: 100px; 
height: 100px;
border-radius: 50%;  //makes img circular
object-fit: cover; //makes sure the img fits the circle
`;


export const SignUpContainer = styled.div`
 
 position: absolute;
 top: 0;
 height: 100%;
 transition: all 0.6s ease-in-out;
 left: 0;
 width: 50%;
 opacity: 0;
 z-index: 1;
 

 ${props => props.signinIn !== true ? `
   transform: translateX(100%);  //animating based on the signin button state
   opacity: 1;
   z-index: 5;
   background: #000000;
 ` 
 : null}
`;


export const SignInContainer = styled.div`
position: absolute;
top: 0;
height: 100%;
transition: all 0.6s ease-in-out;
left: 0;
width: 50%;
z-index: 2;


${props => (props.signinIn !== true ? `transform: translateX(100%); background: #000000;` : null)}
`;

export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
height: 100%;
text-align: center;
`;

export const BackgroundImage = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const Title = styled.h1`
font-weight: bold;
margin: 0;
`;

export const Input = styled.input`
background-color: #eee;
border: none; //text input stuff
padding: 12px 15px;
margin: 8px 0;
width: 100%;
`;


export const Button = styled.button`
   border-radius: 20px;
   border: 1px solid #000000;
   background-color: transparent;
   color: #000000;
   font-size: 12px;
   font-weight: bold;
   padding: 12px 45px;
   letter-spacing: 1px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;
export const GhostButton = styled(Button)`
background-color: transparent;
border-color: #ffffff;
color: #ffffff;
`;

export const Anchor = styled.a`
color: #333;
font-size: 14px;
text-decoration: none;
margin: 15px 0;
`;
export const OverlayContainer = styled.div`
background: transparent;
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 100;    //These components are used to create overlay effects when transitioning between the sign-up and sign-in forms. They control the visibility and transformation of overlay elements. The transform property is used to slide the overlays in and out of view based on the signinIn prop.

${props =>
 props.signinIn !== true ? `transform: translateX(-100%); background: transparent;` : null}
`;

export const Overlay = styled.div`
background: #FFFFFF;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;

${props => (props.signinIn !== true ? `transform: translateX(50%); background: #FFFFFF;` : null)}
`;

export const OverlayPanel = styled.div`

    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    
    
`;

export const LeftOverlayPanel = styled(OverlayPanel)` 

  transform: translateX(-20%);
  ${props => props.signinIn !== true ? `transform: translateX(0); background: transparent;  ` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`

    right: 0;
    transform: translateX(0);
    
    ${props => props.signinIn !== true ? `transform: translateX(20%); background: transparent;  ` : null}
`;

export const Paragraph = styled.p`
 font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px

  
`;

