const express = require("express");
const router = express.Router();
const Comentario = require("../models/comentarios");

// Crear nuevo comentario
router.post("/", async (req, res) => {
  try {
    // Validar calificación
    if (req.body.calificacion < 1 || req.body.calificacion > 5) {
      return res.status(400).json({ error: "La calificación debe estar entre 1 y 5" });
    }

    const nuevoComentario = new Comentario({
      cliente_id: req.body.cliente_id,
      paquete_id: req.body.paquete_id,
      comentario: req.body.comentario,
      calificacion: req.body.calificacion
    });
    
    const comentarioGuardado = await nuevoComentario.save();
    res.status(201).json(comentarioGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los comentarios
router.get("/", async (req, res) => {
  try {
    const comentarios = await Comentario.find();
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
});

// Obtener comentarios por paquete
router.get("/paquete/:paqueteId", async (req, res) => {
  try {
    const comentarios = await Comentario.find({ paquete_id: req.params.paqueteId });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
});

// Actualizar comentario
router.put("/:id", async (req, res) => {
  try {
    // Validar calificación
    if (req.body.calificacion && (req.body.calificacion < 1 || req.body.calificacion > 5)) {
      return res.status(400).json({ error: "La calificación debe estar entre 1 y 5" });
    }

    const comentarioActualizado = await Comentario.findByIdAndUpdate(
      req.params.id,
      {
        comentario: req.body.comentario,
        calificacion: req.body.calificacion
      },
      { new: true }
    );
    
    if (!comentarioActualizado) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    
    res.json(comentarioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar comentario
router.delete("/:id", async (req, res) => {
  try {
    const comentarioEliminado = await Comentario.findByIdAndDelete(req.params.id);
    
    if (!comentarioEliminado) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    
    res.json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;