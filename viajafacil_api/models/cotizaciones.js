const mongoose = require("mongoose");

const CotizacionSchema = new mongoose.Schema({
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  paquete_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paquete",
    required: true,
  },
  num_personas: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  precio_final: {
    type: Number,
    required: true,
  },
  fecha_cotizacion: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ["pendiente", "aprobada", "rechazada", "cancelada"],
    default: "pendiente",
  },
  detalles_adicionales: {
    type: String,
    default: "",
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
}, { 
  collection: 'cotizaciones',
  timestamps: false
});

module.exports = mongoose.model("Cotizacion", CotizacionSchema);
