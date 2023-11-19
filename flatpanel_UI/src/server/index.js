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

app.get('/GetCart', (req, res) => {
  CartModel.find()
    .then(Cart => res.json(Cart))
    .catch(error => res.json(error));
});

app.delete('/DeleteUser/:id', (req, res) => {
  const id=req.params.id
  UsersModel.findByIdAndDelete({_id:id})
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
    const updatedCart = await CartModel.findByIdAndUpdate(id, cartItem, { new: true });
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//use the og price value from the cart to show on frontend
//dont change in db until checkout
//on checkout, update the cart db, calculate the grand total of cart 
//temporarily disable the cart until order completion
//make order using the grandtotal n other info
//enable the cart back when order completed
//ezzzzzzzzzzz


app.put('/DecCart/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await CartModel.findById(id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    cartItem.orderedQuantity -= 1;
    const updatedCart = await CartModel.findByIdAndUpdate(id, cartItem, { new: true });
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
