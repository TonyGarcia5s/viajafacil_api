const express = require("express");
const router = express.Router();
const Comentario = require("../models/comentarios");

//Obtener todos los comentarios 
router.get("/", async (req, res) => {
  try {
    const comentarios = await Comentario.find()
      .populate("cliente_id", "nombre")
      .populate("paquete_id", "nombre");
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Crear comentario
router.post("/", async (req, res) => {
  const comentario = new Comentario({
    cliente_id: req.body.cliente_id,
    paquete_id: req.body.paquete_id,
    comentario: req.body.comentario,
    calificacion: req.body.calificacion
  });

  try {
    const nuevoComentario = await comentario.save();
    res.status(201).json(nuevoComentario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Eliminar comentario
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Comentario.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Comentario no encontrado" });
    res.json({ message: "Comentario eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
