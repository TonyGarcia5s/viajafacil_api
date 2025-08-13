// models/agentes.js
const mongoose = require('mongoose');

const agenteSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  experiencia_anios: Number,
  especialidad: String,
  activo: {
    type: Boolean, default: true
  }
});

module.exports = mongoose.model('Agente', agenteSchema);
