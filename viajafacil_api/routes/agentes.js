
const express = require('express');
const router = express.Router();
const agentes = require("../models/agentes");

// POST nuevo agente
router.post('/', async (req, res) => {
  const nuevoAgente = new agentes(req.body);
  await nuevoAgente.save();
  res.status(201).json(nuevoAgente);
});

// GET todos los agentes
router.get('/', async (req, res) => {
  const agente = await agentes.find();
  res.json(agente);
});

// PUT para agentes
router.put('/:id', async (req, res) => {
  try {
    const dato = await agentes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (dato) {
      res.json(dato);
    } else {
      res.status(404).json({ error: "No se encontró el elemento para actualizar" });
    }
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

// PATCH para cambiar estado de activo/inactivo de un agente
router.patch("/:id/estado", async (req, res) => {
  try {
    const { activo } = req.body; // Se espera un booleano true/false

    const agente = await agentes.findByIdAndUpdate(
      req.params.id,
      { activo },
      { new: true, runValidators: true }
    );

    if (!agente) {
      return res.status(404).json({ mensaje: "Agente no encontrado" });
    }

    res.json(agente);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al cambiar el estado del agente",
      error: error.message
    });
  }
});


// DELETE para agentes
router.delete('/:id', async (req, res) => {
  try {
    const dato = await agentes.findByIdAndDelete(req.params.id);
    if (dato) {
      res.status(200).json({ mensaje: "El elemento fue eliminado" });
    } else {
      res.status(404).json({ error: "No se encontró el elemento" });
    }
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});


module.exports = router;