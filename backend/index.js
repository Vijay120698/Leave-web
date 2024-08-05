require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const  db  = require('./models');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 


const authRoutes = require('./routes/authRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const userRoutes = require('./routes/userRoutes')

app.use('/api/auth', authRoutes);
app.use('/api/profile', userRoutes);
app.use('/api/leaves', leaveRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await db.sequelize.sync();
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
});

