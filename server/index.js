let express = require('express');
let path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, '../dist');

app.use(express.static(publicPath));

app.listen(process.env.port || 8080, () =>
  console.log('Now lintenig for request')
);