const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on('error', () => console.log('Lost PG connection'));

const timerId = setInterval(() => {
  console.log(pgClient);
  if (pgClient) {
    pgClient
      .query('CREATE TABLE IF NOT EXISTS listitems (item TEXT)')
      .catch(err => console.log(err));
    clearInterval(timerId);
  }
}, 1000);

app.get('/values/all', async (req, res) => {
  const items = await pgClient.query('SELECT * from listitems');
  res.send(items.rows);
});

app.delete('/values/all', async (req, res) => {
  const values = await pgClient.query('DELETE from listitems');
  res.send(values.rows);
});

app.post('/values', async (req, res) => {
  const newItem = req.body.item;
  await pgClient.query('INSERT INTO listitems(item) VALUES($1)', [newItem]);
  const items = await pgClient.query('SELECT * from listitems');
  res.send(items.rows);
});

app.listen(5000, err => {
  console.log('Listening');
});
