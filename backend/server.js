const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser");
const path = require('path');
const checkToken=require('./middleware/checkToken')

const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 8000;

const connectdb =require("./config/connectdb");
connectdb();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/profile',checkToken, require('./routes/ProfileRoute'));

// app.use(express.static(path.join(__dirname, "../frontend", "dist")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
// });

app.listen(PORT, () => {
    console.log(`Server is Listening on http://localhost:${PORT}`)
})