const mongoose = require('mongoose');

const preferenciasSchema = new mongoose.Schema({
  cliente_id: String,
  preferencias_clima: String,
  tipos_destinos: [String],
  actividades_favoritas: [String]
});

module.exports = mongoose.model('Preferencia', preferenciasSchema);
