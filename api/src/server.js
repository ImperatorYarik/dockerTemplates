const app = require('./app');
const { connectDB } = require('./config/dbConfig');

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to the database:', err);
});