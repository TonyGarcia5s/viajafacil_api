const express = require('express');
const router = express.Router();
const Pago = require('../models/pagos');

//Obtener todos los pagos
router.get('/', async (req, res) => {
  try {
    const pagos = await Pago.find().populate('cliente_id', 'nombre email');
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener un pago por ID
router.get('/:id', async (req, res) => {
  try {
    const pago = await Pago.findById(req.params.id).populate('cliente_id', 'nombre email');
    if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
    res.json(pago);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Crear un nuevo pago
router.post('/', async (req, res) => {
  const pago = new Pago({
    cliente_id: req.body.cliente_id,
    monto: req.body.monto,
    metodo: req.body.metodo,
    fecha_pago: req.body.fecha_pago || Date.now(),
    estado: req.body.estado || 'pendiente'
  });

  try {
    const nuevoPago = await pago.save();
    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Actualizar un pago
router.put('/:id', async (req, res) => {
  try {
    const pago = await Pago.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
    res.json(pago);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Eliminar un pago
router.delete('/:id', async (req, res) => {
  try {
    const pago = await Pago.findByIdAndDelete(req.params.id);
    if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
    res.json({ message: 'Pago eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
