const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const commandRoutes = require('./routes/commandRoutes');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/commands', commandRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
