const mongoose = require("mongoose");

const ItinerarioSchema = new mongoose.Schema({
  paquete_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paquete",
    required: true
  },
  dia: {
    type: Number,
    required: true,
    min: 1
  },
  actividad: {
    type: String,
    required: true,
    maxlength: 200
  }
});

module.exports = mongoose.model("Itinerario", ItinerarioSchema);