import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import UsersModel from './models/Users.js';
import Users from './models/Users.js';
import MechanicsModel from './models/Mechanics.js';
import BikesModel from './models/Bikes.js'
import Mechanics from './models/Mechanics.js';
import WishlistModel from './models/Wishlist.js';
import CartModel from './models/Cart.js';
import OrderModel from './models/Orders.js';
import PaymentModel from './models/Payments.js';
import FeedbackModel from './models/Feedback.js';



const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect('mongodb://127.0.0.1:27017/SE-Project', {
  //req is the data coming from the frontend, and response is the data we're sending back to the frontend
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {   
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/Bikes', upload.single('Image'), async (req, res) => {
  console.log(req.body);
  console.log(req.file); 
  
  try {
    await BikesModel.create({
      name: req.body.name,
      price: req.body.price,
      availableQuantity: req.body.availableQuantity,
      category: req.body.category,
      Image: req.file.filename
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get('/GetBikes', (req, res) => {
  BikesModel.find()
    .then(bikes => res.json(bikes))
    .catch(error => res.json(error));
});

app.get('/GetUsers', (req, res) => {
  UsersModel.find()
    .then(users => res.json(users))
    .catch(error => res.json(error));
});


app.get('/GetWishlist', (req, res) => {
  WishlistModel.find()
    .then(Wishlist => res.json(Wishlist))
    .catch(error => res.json(error));
});

app.get('/GetFeedback', (req, res) => {
  FeedbackModel.find()
    .then(Feedback => res.json(Feedback))
    .catch(error => res.json(error));
});

app.get('/GetOrders', (req, res) => {
  OrderModel.find()
    .then(Order => res.json(Order))
    .catch(error => res.json(error));
});

app.get('/GetCart', (req, res) => {
  CartModel.find()
    .then(Cart => res.json(Cart))
    .catch(error => res.json(error));
});

app.get('/GetPaymentHistory', (req, res) => {
  PaymentModel.find()
    .then(Payment => res.json(Payment))
    .catch(error => res.json(error));
});

app.delete('/DeleteUser/:id', (req, res) => {
  const id=req.params.id
  UsersModel.findByIdAndDelete({_id:id})
  .then(res => res.json(res))
  .catch(error => res.json(error));
});

app.delete('/DeleteOrder/:id', (req, res) => {
  const id=req.params.id
  OrderModel.findByIdAndDelete({_id:id})
  .then(res => res.json(res))
  .catch(error => res.json(error));
});

app.delete('/DeleteWishlist/:id', (req, res) => {
  const id=req.params.id
  WishlistModel.findByIdAndDelete({_id:id})
  .then(res => res.json(res))
  .catch(error => res.json(error));
});


app.get('/GetBikes/:id', (req, res) => {
  const id=req.params.id
  BikesModel.findById({_id:id})
  .then(bikes => res.json(bikes))
  .catch(error => res.json(error));
});

app.get('/GetCart/:id', (req, res) => {
  const id=req.params.id
  CartModel.findById({_id:id})
  .then(Cart => res.json(Cart))
  .catch(error => res.json(error));
});

app.delete('/DeleteBike/:id', (req, res) => {
  const id=req.params.id
  BikesModel.findByIdAndDelete({_id:id})
  .then(res => res.json(res))
  .catch(error => res.json(error));
});

app.delete('/DeleteCart/:id', (req, res) => {
  const id=req.params.id
  CartModel.findByIdAndDelete({_id:id})
  .then(res => res.json(res))
  .catch(error => res.json(error));
});

app.delete('/ClearCart', (req, res) => {
  CartModel.deleteMany({})
    .then(result => res.json({ message: 'Cart Cleared Successfully', result }))
    .catch(error => res.json({ error }));
});

app.put('/UpdateBikes/:id', async (req, res) => {
  try{
  const id=req.params.id
  const updatedBike = await BikesModel.findByIdAndUpdate(id,
    { name:req.body.name,
      price: req.body.price,
      availableQuantity: req.body.availableQuantity,
      category: req.body.category,
      Image: req.body.Image
    }, {new: true}); 
    res.json(updatedBike);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/Users', (req, res) => {
  UsersModel.create(req.body)
    .then((Users) => res.json(Users))
    .catch((error) => res.json(error));
});

app.post('/Wishlist', (req, res) => {
  WishlistModel.create(req.body)
    .then((Wishlist) => res.json(Wishlist))
    .catch((error) => res.json(error));
});

app.post('/Cart', (req, res) => {
  CartModel.create(req.body)
    .then((Cart) => res.json(Cart))
    .catch((error) => res.json(error));
});

app.post('/Mechanics', (req, res) => {
  MechanicsModel.create(req.body)
    .then((Mechanics) => res.json(Mechanics))
    .catch((error) => res.json(error));
});

app.post('/Feedback', (req, res) => {
  FeedbackModel.create(req.body)
    .then((Feedback) => res.json(Feedback))
    .catch((error) => res.json(error));
});

app.get('/BikeCount', async (req, res) => {
  try {
    const bikeCount = await BikesModel.countDocuments(); 
    res.json({ count: bikeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/RefundsCount', async (req, res) => {
  try {
    const bikeCount = await PaymentModel.countDocuments({ refunded: true }); 
    res.json({ count: bikeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/CustCount', async (req, res) => {
  try {
    const Count = await UsersModel.countDocuments({ role: 'Customer' }); 
    res.json({ count: Count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/Users', async (req, res) => {
  try {
    const Count = await UsersModel.countDocuments(); 
    res.json({ count: Count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/MechanicsCount', async (req, res) => {
  try {
    const Count = await UsersModel.countDocuments({ role: 'Mechanic' }); 
    res.json({ count: Count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/Approvedmechanics', async (req, res) => {
  try {
    const Count = await MechanicsModel.countDocuments({ isApproved: true }); 
    res.json({ count: Count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/GetStock/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const bike = await BikesModel.findById(itemId);
    if (bike) {
      res.json({ quantity: bike.availableQuantity });
    } else {
      res.status(404).json({ error: 'Bike not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/UpdateStock/:id', async (req, res) => {
  const itemId = req.params.id;
  const { quantity } = req.body;

  try {
    const bike = await BikesModel.findById(itemId);
    if (bike) {
      bike.availableQuantity = quantity;
      await bike.save();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Bike not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/ApplicationsCount', async (req, res) => {
  try {
    const Count = await MechanicsModel.countDocuments(); 
    res.json({ count: Count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/WishlistCount', async (req, res) => {
  try {
    const bikeCount = await WishlistModel.countDocuments(); 
    res.json({ count: bikeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/DeliveredOrdersCount', async (req, res) => {
  try {
    const deliveredOrdersCount = await OrderModel.countDocuments({ status: 'Delivered' });
    res.json({ count: deliveredOrdersCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/Order', (req, res) => {
  OrderModel.create(req.body)
    .then((Order) => res.json(Order))
    .catch((error) => res.json(error));
});

app.post('/Payment', (req, res) => {
  PaymentModel.create(req.body)
    .then((Payment) => res.json(Payment))
    .catch((error) => res.json(error));
});

app.get('/GetMechanics', (req, res) => {
  MechanicsModel.find()
    .then(Mechanics => res.json(Mechanics))
    .catch(error => res.json(error));
});

app.put('/ApproveMechanic/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMechanic = await Mechanics.findByIdAndUpdate(id, { isApproved: true }, { new: true });
    res.json(updatedMechanic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/Refund/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedpaymenthistory = await PaymentModel.findByIdAndUpdate(id, { refunded: true }, { new: true });
    res.json(updatedpaymenthistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/PaymentHistory/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const paymenthistory = await PaymentModel.findById(id);
    if (!paymenthistory) {
      return res.status(404).json({ error: 'Payment history not found' });
    }

    res.json(paymenthistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/Card/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, { paymentmethod: 'Card' }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/Cash/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, { paymentmethod: 'Cash' }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/Confirm/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, { status: 'Delivered' }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/DisapproveMechanic/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMechanic = await Mechanics.findByIdAndUpdate(id, { isApproved: false }, { new: true });
    res.json(updatedMechanic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/IncCart/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await CartModel.findById(id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    cartItem.orderedQuantity += 1;
    cartItem.updatedprice = cartItem.orderedQuantity * cartItem.price;
    const updatedCart = await CartModel.findByIdAndUpdate(id, cartItem, { new: true });
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/UpdateCart', async (req, res) => {
  try {
    const { updatedCart } = req.body;

    for (const updatedCartItem of updatedCart) {
      const filter = { _id: updatedCartItem._id };
      const update = {
        $set: {
          orderedQuantity: updatedCartItem.orderedQuantity,
          price: updatedCartItem.price,
        },
      };
      await CartModel.updateOne(filter, update);
    }
    res.json({ success: true, message: 'Cart Updated' });
  } catch (error) {
    console.error('Error Updating cart:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


app.put('/DecCart/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await CartModel.findById(id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    cartItem.orderedQuantity -= 1;
    cartItem.updatedprice = cartItem.orderedQuantity * cartItem.price;
    const updatedCart = await CartModel.findByIdAndUpdate(id, cartItem, { new: true });
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/CheckUsers', async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: 'Email parameter is required' });
  }

  try {
    const user = await UsersModel.findOne({ email });

    if (user) {
      return res.status(200).json({ message: 'Email is already in use' });
    } else {
      return res.status(200).json({ message: 'Email is available' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (user) {
      if (password === user.password) {
        console.log('User Role:', user.role); 
        res.status(200).json({ message: 'Authentication successful',
        role: user.role, 
      });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(3001, () => {
  console.log('Server is running');
});
