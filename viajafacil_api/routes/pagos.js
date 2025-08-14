const express = require("express");
const router = express.Router();
const Pago = require("../models/pagos");

// Crear nuevo pago
router.post("/", async (req, res) => {
  try {
    // Validar método de pago
    const metodosValidos = ["tarjeta", "transferencia", "efectivo"];
    if (!metodosValidos.includes(req.body.metodo)) {
      return res.status(400).json({ error: "Método de pago inválido" });
    }

    const nuevoPago = new Pago({
      cliente_id: req.body.cliente_id,
      cotizacion_id: req.body.cotizacion_id,
      monto: req.body.monto,
      metodo: req.body.metodo,
      estado: req.body.estado || "pendiente"
    });
    
    const pagoGuardado = await nuevoPago.save();
    res.status(201).json(pagoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los pagos
router.get("/", async (req, res) => {
  try {
    const pagos = await Pago.find();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pagos" });
  }
});

// Obtener pagos por cliente
router.get("/cliente/:clienteId", async (req, res) => {
  try {
    const pagos = await Pago.find({ cliente_id: req.params.clienteId });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pagos" });
  }
});

// Actualizar estado de pago
router.put("/:id/estado", async (req, res) => {
  try {
    // Validar estado
    const estadosValidos = ["pendiente", "completado", "fallido"];
    if (!estadosValidos.includes(req.body.estado)) {
      return res.status(400).json({ error: "Estado de pago inválido" });
    }

    const pagoActualizado = await Pago.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    
    if (!pagoActualizado) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }
    
    res.json(pagoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar pago
router.delete("/:id", async (req, res) => {
  try {
    const pagoEliminado = await Pago.findByIdAndDelete(req.params.id);
    
    if (!pagoEliminado) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }
    
    res.json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;