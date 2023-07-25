const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = process.env.PORT || 5001;
const authRoute = require('./routes/auth');
const articleRoute = require('./routes/article');
const userRoute = require('./routes/user');

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use('/api/auth', authRoute);
app.use('/api/articles', articleRoute);
app.use('/api/users', userRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
