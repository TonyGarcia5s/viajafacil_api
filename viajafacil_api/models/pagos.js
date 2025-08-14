const mongoose = require("mongoose");

const PagoSchema = new mongoose.Schema({
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true
  },
  cotizacion_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cotizacion",
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  metodo: {
    type: String,
    enum: ["tarjeta", "transferencia", "efectivo"],
    required: true
  },
  fecha_pago: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ["pendiente", "completado", "fallido"],
    default: "pendiente"
  }
});

module.exports = mongoose.model("Pago", PagoSchema);