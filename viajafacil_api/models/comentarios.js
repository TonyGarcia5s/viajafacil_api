const mongoose = require("mongoose");

const ComentarioSchema = new mongoose.Schema({
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true
  },
  paquete_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paquete",
    required: true
  },
  comentario: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  calificacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comentario", ComentarioSchema);