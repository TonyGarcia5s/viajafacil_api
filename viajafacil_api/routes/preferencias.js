const express = require('express');
const router = express.Router();
const preferencias = require('../models/preferencias');


// POST nueva preferencia
router.post('/', async (req, res) => {
  const nuevoPref = new preferencias(req.body);
  await nuevoPref.save();
  res.status(201).json(nuevoPref);
});

// GET todas las preferencias
router.get('/', async (req, res) => {
  const preferencia= await preferencias.find();
  res.json(preferencia);
});

// PUT para actualizar preferencia por _id
router.put('/:id', async (req, res) => {
  try {
    const datoPref = await preferencias.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (datoPref) {
      res.json(datoPref);
    } else {
      res.status(404).json({ error: "No se encontró el elemento para actualizar" });
    }
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

// DELETE para eliminar preferencia por _id
router.delete('/:id', async (req, res) => {
  try {
    const datoPref = await preferencias.findByIdAndDelete(req.params.id);
    if (datoPref) {
      res.status(200).json({ mensaje: "El elemento fue eliminado" });
    } else {
      res.status(404).json({ error: "No se encontró el elemento" });
    }
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

router.get('/cliente/:clienteId', async (req, res) => {
  const lista = await preferencias.find({ cliente_id: req.params.clienteId });
  res.json(lista);
});
module.exports = router;
