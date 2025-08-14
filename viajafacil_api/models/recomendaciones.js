const mongoose = require('mongoose');

const recomendacionesSchema = new mongoose.Schema({
  cliente_id: String,
  temporada: String,
  paquetes_sugeridos: [
    {
      paquete_id: String,
      razon: String
    }
  ]
}, { 
  collection: 'recomendaciones'
});

module.exports = mongoose.model('Recomendacion', recomendacionesSchema);
