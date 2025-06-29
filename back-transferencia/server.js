const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transferRoute = require('./api/transfer');

const app = express();
app.use(cors());
app.use(express.json());

// Montar el router
app.use('/api', transferRoute);

// Servidor escucha en el puerto definido
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ API escuchando en puerto ${PORT}`);
});
