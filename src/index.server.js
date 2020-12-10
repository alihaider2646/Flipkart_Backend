const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require('./routes/address');
const orderRoutes = require("./routes/order");
const adminOrderRoutes = require('./routes/admin/order.routes');

// environment variable or you can say constants
env.config();

// Mongodb Connection
// mongodb + srv://root:<password>@cluster0.ytzmi.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ytzmi.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(() => {
    console.log("Database Connected");
})

// for validating the request we used this pacakage
app.use(cors());
// its some middleware for passing some data as Payload
app.use(express.json());
// ************************  OR  ************************  
// app.use(bodyParser());

// by the below line of code anyone can get the static files using any api route on browser like images and many more
// app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoutes);

// creating server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

// // creating API
// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Hello from Server'
//     })
// })

// app.post('/data', (req, res, next) => {
//     res.status(200).json({
//         message: req.body
//     })
// })
