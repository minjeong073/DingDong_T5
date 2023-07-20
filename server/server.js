const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = process.env.PORT || 5001;
const articleRoute = require('./routes/article');

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use('/api/articles', articleRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
