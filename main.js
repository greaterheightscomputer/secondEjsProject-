//basic structure of server
// require('dotenv').config();//its enable access environment variables inside .env
// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');

// const app = express();
// const PORT = process.env.PORT || 4000;

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

// app.listen(PORT, () => {
//   console.log(`Server started at http://localhost:${PORT}`);
// });

//========================
//data connection
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');

// const app = express();
// const PORT = process.env.PORT || 4000;

// // //database connection
// mongoose.connect(process.env.DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', (error) => console.log(error));
// db.once('open', () => console.log('Connected to database!!'));

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

// app.listen(PORT, () => {
//   console.log(`Server started at http://localhost:${PORT}`);
// });

//======================
//add middlewares
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = require('./routes/routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

//database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database!'));

//middlewares
app.use(express.urlencoded({ extended: false })); //its enable user to send and receive data from frontend to backend
app.use(express.json());
app.use(
  session({
    secret: 'secret ejs',
    saveUninitialized: true,
    resave: false,
  })
);

//for saving session message onto the req object
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//add this to view the images on the index.ejs
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, './public')));

//set the template engine which is EJS
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

//route prefix
app.use('', router);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
