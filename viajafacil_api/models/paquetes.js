const mongoose = require("mongoose");

const PaqueteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    default: "",
  },
  destinos: [
    {
      type: String,
      required: true,
    },
  ],
  precio: {
    type: Number,
    required: true,
  },
  duracion_dias: {
    type: Number,
    required: true,
  },
  incluye: [
    {
      type: String,
      enum: [
        "hotel",
        "vuelos",
        "excursiones",
        "transporte",
        "alimentacion",
        "guia",
      ],
    },
  ],
  temporada: {
    type: String,
    enum: ["verano", "invierno", "primavera", "otoño", "todo_el_año"],
    default: "todo_el_año",
  },
  personalizable: {
    type: Boolean,
    default: true,
  },
  imagen_url: {
    type: String,
    default: "",
  },
  cupo_disponible: {
    type: Number,
    default: 0,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Paquete", PaqueteSchema);
