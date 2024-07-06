const express = require('express');
const bodyParser = require('body-parser');
const { addProduct, removeProduct, sellProduct, getProducts } = require('./handlers');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/addProduct', addProduct);
app.post('/removeProduct', removeProduct);
app.post('/sellProduct', sellProduct);
app.get('/getProducts', getProducts);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
