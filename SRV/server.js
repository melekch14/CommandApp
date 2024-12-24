const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const commandRoutes = require('./routes/commandRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/commands', commandRoutes);
app.use('/expenses', expenseRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
