const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();

const verifyJWT = require('./middleware/verifyJWT');

const users = require('./routes/users');
const newArticle = require('./routes/newArticle');
const connectDB = require('./config/db');

connectDB();

// app.use(express.json());
// app.use(
//     cors({
//         origin: 'http://localhost:9000',
//         methods: ['GET', 'POST'],
//         credentials: true,
//     })
// );
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//     session({
//         key: 'userId',
//         secret: 'subscrible',
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             maxAge: 30 * 60 * 1000,
//         },
//     })
// );

app.get('/', (req, res) => {
    // app.use('/', express.static('./dist'));
    // app.use('/node_modules', express.static('./node_modules'));
    // res.sendFile(`${__dirname}/dist/index.html`, (err) => {
    //     if (err) res.sendStatus(404);
    // });
    res.send('hellow world');
});

app.use('/api/users', users);
app.use('/api/newarticle', newArticle);

app.get('/api/test', verifyJWT, (req, res) => {
    res.send('API test!!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
