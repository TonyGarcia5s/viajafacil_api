const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const clientesRoutes = require('./routes/clientes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/viaja_facil', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('📦 Conectado a MongoDB'))
  .catch(err => console.error(err));

app.use('/api/clientes', clientesRoutes);

app.get('/', (req, res) => {
  res.send('API de ViajaFácil funcionando 🚀');
});

app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});