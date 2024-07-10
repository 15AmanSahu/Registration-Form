const express = require('express');
const connectDB = require('./src/db/connectionDB'); 
const path = require('path');
const bodyParser = require('body-parser');
const Registration = require('./src/models/Registration'); 

const app = express();
const PORT = process.env.PORT || 6060;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


connectDB().then(() => {

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/index.html'));
  });

  app.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;

 
      const existingUser = await Registration.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

  
      const registrationData = new Registration({
        name,
        email,
        password,
      });

      await registrationData.save();
      res.redirect('/success');

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/success.html'));
  });

  app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/error.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error(`Failed to connect to MongoDB: ${err.message}`);
  process.exit(1);
});
