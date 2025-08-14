const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  preferencias: {
    clima: {
      type: String,
      enum: ["tropical", "templado", "frio", "cualquiera"],
      default: "cualquiera",
    },
    presupuesto_max: {
      type: Number,
      min: 0,
      default: 0,
    },
    tipo_viaje: {
      type: String,
      enum: [
        "aventura",
        "relax",
        "cultural",
        "romantico",
        "familiar",
        "negocios",
        "gastronomico",
      ],
      default: "aventura",
    },
  },
  fecha_registro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cliente", ClienteSchema);
