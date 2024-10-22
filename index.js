import express from 'express';
const app = express();
const port = 3000;
import bodyParser from 'body-parser';
import pool from './db.js';
import T_routes from './srbc/routers/T_routes.js'
import R_routes from './srbc/routers/R_routes.js'
import M_routes from './srbc/routers/M_routes.js'
import P_routes from './srbc/routers/P_routes.js'
import General_routes from './srbc/routers/General_routes.js'
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors());

app.use('', General_routes);
app.use('/TechMedi', T_routes);
app.use('/Reception', R_routes);
app.use('/Member', M_routes);
app.use('/Physician', P_routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});