const express = require("express");
const router = express.Router();
const Itinerario = require("../models/itinerarios");

//Obtener todos los itinerarios
router.get("/", async (req, res) => {
  try {
    const itinerarios = await Itinerario.find();
    res.json(itinerarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener itinerarios" });
  }
});

//Obtener itinerario por ID
router.get("/:id", async (req, res) => {
  try {
    const itinerario = await Itinerario.findById(req.params.id);
    if (!itinerario) return res.status(404).json({ error: "Itinerario no encontrado" });
    res.json(itinerario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Crear nuevo itinerario
router.post("/", async (req, res) => {
  try {
    const nuevoItinerario = new Itinerario({
      paquete_id: req.body.paquete_id,
      dia: req.body.dia,
      actividad: req.body.actividad
    });
    const itinerarioGuardado = await nuevoItinerario.save();
    res.status(201).json(itinerarioGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Actualizar itinerario
router.put("/:id", async (req, res) => {
  try {
    const itinerarioActualizado = await Itinerario.findByIdAndUpdate(
      req.params.id,
      {
        paquete_id: req.body.paquete_id,
        dia: req.body.dia,
        actividad: req.body.actividad
      },
      { new: true }
    );
    if (!itinerarioActualizado) return res.status(404).json({ error: "Itinerario no encontrado" });
    res.json(itinerarioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Eliminar itinerario
router.delete("/:id", async (req, res) => {
  try {
    const itinerarioEliminado = await Itinerario.findByIdAndDelete(req.params.id);
    if (!itinerarioEliminado) return res.status(404).json({ error: "Itinerario no encontrado" });
    res.json({ message: "Itinerario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
