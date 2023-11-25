import * as Components from './SignupSigninComponents.jsx';

const C_Support = () => {
  const divStyle = {
    position: 'absolute',
    top: '50%',  
    left: '60%', 
    transform: 'translate(-50%, -50%)', // Center the div
  };

  return (
    <div style={divStyle}>
      <Components.Title style={{ textAlign: 'right' }}>1. Explore the Products Section to Browse, Add to Wishlist, or Purchase Items</Components.Title>
      <Components.Title style={{ textAlign: 'right' }}>2. Finalize Your Order in the Shopping Cart</Components.Title>
      <Components.Title style={{ textAlign: 'right' }}>3. Select a Payment Method and Confirm Your Order in the Checkout Section</Components.Title>
    </div>
  );
};

export default C_Support;
