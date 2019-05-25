
const dotenv      = require('dotenv').config();
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const mongoUri    = process.env.MONGO_URI;
const mongoDbName = process.env.MONGO_DB_NAME;

// connect to mongoose instance (default config)
mongoose.connect(`${mongoUri}/${mongoDbName}`, { useNewUrlParser: true });

// user model
const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('users', userSchema);

// configuring bodyParser for POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 9999;

// API Routes
const router = express.Router();

router.post('/user', (req, res) => {
  const userData = req.body;
  const user = new User(userData);

  user.save((error) => {
    if (!!error) 
      return res.status(500).send({error: error});

    return res.status(500).send({
      message: 'user created successfully'
    });
  });
});

app.use('/api', router);

app.listen(port);
console.log(`port ${port}`);