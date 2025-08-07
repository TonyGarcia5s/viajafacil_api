const express = require("express");
const router = express.Router();
const Cotizacion = require("../models/cotizaciones");

// GET todas las cotizaciones
router.get("/", async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find()
      .populate("cliente_id", "nombre correo")
      .populate("paquete_id", "nombre precio");
    res.json(cotizaciones);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener cotizaciones", error: error.message });
  }
});

// GET cotización por ID
router.get("/:id", async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findById(req.params.id)
      .populate("cliente_id", "nombre correo telefono")
      .populate("paquete_id", "nombre precio destinos duracion_dias");
    if (!cotizacion) {
      return res.status(404).json({ mensaje: "Cotización no encontrada" });
    }
    res.json(cotizacion);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener cotización", error: error.message });
  }
});

// GET cotizaciones por cliente
router.get("/cliente/:clienteId", async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find({
      cliente_id: req.params.clienteId,
    }).populate("paquete_id", "nombre precio destinos");
    res.json(cotizaciones);
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje: "Error al obtener cotizaciones del cliente",
        error: error.message,
      });
  }
});

// GET cotizaciones por estado
router.get("/estado/:estado", async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find({ estado: req.params.estado })
      .populate("cliente_id", "nombre correo")
      .populate("paquete_id", "nombre precio");
    res.json(cotizaciones);
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje: "Error al obtener cotizaciones por estado",
        error: error.message,
      });
  }
});

// POST nueva cotización
router.post("/", async (req, res) => {
  try {
    const nueva = new Cotizacion(req.body);
    await nueva.save();
    const cotizacionPopulada = await Cotizacion.findById(nueva._id)
      .populate("cliente_id", "nombre correo")
      .populate("paquete_id", "nombre precio");
    res.status(201).json(cotizacionPopulada);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al crear cotización", error: error.message });
  }
});

// PUT actualizar cotización
router.put("/:id", async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("cliente_id", "nombre correo")
      .populate("paquete_id", "nombre precio");

    if (!cotizacion) {
      return res.status(404).json({ mensaje: "Cotización no encontrada" });
    }
    res.json(cotizacion);
  } catch (error) {
    res
      .status(400)
      .json({
        mensaje: "Error al actualizar cotización",
        error: error.message,
      });
  }
});

// PATCH actualizar estado de cotización
router.patch("/:id/estado", async (req, res) => {
  try {
    const { estado } = req.body;
    const cotizacion = await Cotizacion.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true, runValidators: true }
    )
      .populate("cliente_id", "nombre correo")
      .populate("paquete_id", "nombre precio");

    if (!cotizacion) {
      return res.status(404).json({ mensaje: "Cotización no encontrada" });
    }
    res.json(cotizacion);
  } catch (error) {
    res
      .status(400)
      .json({
        mensaje: "Error al actualizar estado de cotización",
        error: error.message,
      });
  }
});

// DELETE eliminar cotización
router.delete("/:id", async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findByIdAndDelete(req.params.id);
    if (!cotizacion) {
      return res.status(404).json({ mensaje: "Cotización no encontrada" });
    }
    res.json({ mensaje: "Cotización eliminada exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar cotización", error: error.message });
  }
});

module.exports = router;
