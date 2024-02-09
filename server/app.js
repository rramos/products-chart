const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../chartjs/data/etl.db'
});

// Define User model
class Cost extends Model {}
Cost.init({
  product_id: DataTypes.STRING,
  category: DataTypes.STRING,
  start_time: DataTypes.TEXT,
  cost: DataTypes.REAL
}, { sequelize, modelName: 'cost' });

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CRUD routes for User model
app.get('/costs', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/cost/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

app.post('/cost', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.put('/cost/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: 'Cost not found' });
  }
});

app.delete('/cost/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'Cost deleted' });
  } else {
    res.status(404).json({ message: 'Cost not found' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
