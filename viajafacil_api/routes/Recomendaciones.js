const express = require('express');
const router = express.Router();
const recomendaciones = require('../models/recomendaciones');

// POST todas las recomendaciones
router.post('/', async (req, res) => {
  const nuevoRec = new recomendaciones(req.body);
  await nuevoRec.save();
  res.status(201).json(nuevoRec);
});

// GET todas las recomendaciones
router.get('/', async (req, res) => {
  const recomendacion = await recomendaciones.find();
  res.json(recomendacion);
});

// PUT para actualizar recomendación por _id
router.put('/:id', async (req, res) => {
  try {
    const datoRec = await recomendaciones.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (datoRec) {
      res.json(datoRec);
    } else {
      res.status(404).json({ error: "No se encontró el elemento para actualizar" });
    }
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

// DELETE para eliminar recomendación por _id
router.delete('/:id', async (req, res) => {
  try {
    const datoRec = await recomendaciones.findByIdAndDelete(req.params.id);
    if (datoRec) {
      res.status(200).json({ mensaje: "El elemento fue eliminado" });
    } else {
      res.status(404).json({ error: "No se encontró el elemento" });
    }
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

// GET recomendaciones por cliente_id
router.get('/cliente/:clienteId', async (req, res) => {
  const lista = await recomendaciones.find({ cliente_id: req.params.clienteId });
  res.json(lista);
});

// GET recomendaciones por temporada
router.get('/temporada/:temp', async (req, res) => {
  const lista = await recomendaciones.find({ temporada: req.params.temp });
  res.json(lista);
});

module.exports = router;