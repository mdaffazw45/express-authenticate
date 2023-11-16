const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { sequelize } = require('./models'); // Import your Sequelize instance

// Middleware for parsing JSON requests
app.use(express.json());

// Define your routes here
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/users', userRoutes);
app.use('/admins', adminRoutes);

// Start the server and check database connection
async function startServer() {
  try {
    // Connect to the database using Sequelize
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Start the Express.js server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
