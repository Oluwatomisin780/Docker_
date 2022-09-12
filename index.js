const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
const cors = require('cors');
app.enable('trust proxy');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require('./config/config');
const redisClient = redis.createClient({
  legacyMode: true,
  url: `redis://${REDIS_URL}:${REDIS_PORT}`,
});
redisClient.connect().catch((err) => console.log(err));
const port = process.env.PORT || 3000;
const mongoUri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUniIntialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);
app.use(cors());
app.use(bodyParser.json());

app.get('/api/v1', (req, res) => {
  res.send('<h2>hello from express</h2>');
  console.log('yeah  it works');
});
app.use('/', postRoute);
app.use('/api/user', userRoute);
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('successfully connected to database!!');
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`app is been listen to on ${port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
