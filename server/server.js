require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

// --- CONNECT OUR ROUTE FILES ---
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // <-- IMPORT AUTH

app.use('/products', productRoutes);
app.use('/auth', authRoutes); // <-- REGISTER AUTH ENDPOINTS
// -------------------------------

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});