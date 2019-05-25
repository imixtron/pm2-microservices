
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

const port = process.env.PORT || 4000;

// API Routes
const router = express.Router();

router.post('/login', (req, res) => {
  const {email, password} = req.body;

  User.findOne({ email: email}, (error, user) => {
    if (error)
      return res.status(500).send({ error: true, message: 'Invalid credentials' });

    if (user.password === password)
      return res.status(200).send({token: Buffer.from(user.password).toString('base64'), ...user.toObject()});
    else
      return res.status(200).send({message: 'Invalid Credentials', r: req.body, u: user})
  })
});

app.use('/auth', router);

app.listen(port);
console.log(`port ${port}`);