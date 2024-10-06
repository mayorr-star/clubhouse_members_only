const express = require('express');
const indexRouter = require('./routes/indexRouter');
const path = require('path');
require('dotenv').config();

const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));