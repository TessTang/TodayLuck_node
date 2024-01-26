const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

let zodiac = require('./router/zodiac.js');
app.use('/zodiac',zodiac);

let lunar = require('./router/lunar.js');
app.use('/lunar', lunar);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
