const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  preferencias: {
    clima: String,
    presupuesto_max: Number,
    tipo_viaje: String
  },
  fecha_registro: Date
});

module.exports = mongoose.model('Cliente', ClienteSchema);