const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const cors=require('cors')
const db = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
