const express = require("express");
const router = express.Router();
const Paquete = require("../models/paquetes");

// GET todos los paquetes
router.get("/", async (req, res) => {
  try {
    const { temporada, precio_min, precio_max, activo } = req.query;
    let filtro = {};

    if (temporada) filtro.temporada = temporada;
    if (activo !== undefined) filtro.activo = activo === "true";
    if (precio_min || precio_max) {
      filtro.precio = {};
      if (precio_min) filtro.precio.$gte = Number(precio_min);
      if (precio_max) filtro.precio.$lte = Number(precio_max);
    }

    const paquetes = await Paquete.find(filtro);
    res.json(paquetes);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener paquetes", error: error.message });
  }
});

// GET paquete por ID
router.get("/:id", async (req, res) => {
  try {
    const paquete = await Paquete.findById(req.params.id);
    if (!paquete) {
      return res.status(404).json({ mensaje: "Paquete no encontrado" });
    }
    res.json(paquete);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener paquete", error: error.message });
  }
});

// GET paquetes por temporada
router.get("/temporada/:temporada", async (req, res) => {
  try {
    const paquetes = await Paquete.find({
      temporada: req.params.temporada,
      activo: true,
    });
    res.json(paquetes);
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje: "Error al obtener paquetes por temporada",
        error: error.message,
      });
  }
});

// GET paquetes por rango de precio
router.get("/precio/:min/:max", async (req, res) => {
  try {
    const paquetes = await Paquete.find({
      precio: { $gte: Number(req.params.min), $lte: Number(req.params.max) },
      activo: true,
    });
    res.json(paquetes);
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje: "Error al obtener paquetes por precio",
        error: error.message,
      });
  }
});

// GET paquetes personalizables
router.get("/personalizables/true", async (req, res) => {
  try {
    const paquetes = await Paquete.find({
      personalizable: true,
      activo: true,
    });
    res.json(paquetes);
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje: "Error al obtener paquetes personalizables",
        error: error.message,
      });
  }
});

// POST nuevo paquete
router.post("/", async (req, res) => {
  try {
    const nuevo = new Paquete(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al crear paquete", error: error.message });
  }
});

// PUT actualizar paquete
router.put("/:id", async (req, res) => {
  try {
    const paquete = await Paquete.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!paquete) {
      return res.status(404).json({ mensaje: "Paquete no encontrado" });
    }
    res.json(paquete);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al actualizar paquete", error: error.message });
  }
});

// PATCH actualizar cupo disponible
router.patch("/:id/cupo", async (req, res) => {
  try {
    const { cupo_disponible } = req.body;
    const paquete = await Paquete.findByIdAndUpdate(
      req.params.id,
      { cupo_disponible },
      { new: true, runValidators: true }
    );

    if (!paquete) {
      return res.status(404).json({ mensaje: "Paquete no encontrado" });
    }
    res.json(paquete);
  } catch (error) {
    res
      .status(400)
      .json({
        mensaje: "Error al actualizar cupo del paquete",
        error: error.message,
      });
  }
});

// PATCH activar/desactivar paquete
router.patch("/:id/estado", async (req, res) => {
  try {
    const { activo } = req.body;
    const paquete = await Paquete.findByIdAndUpdate(
      req.params.id,
      { activo },
      { new: true, runValidators: true }
    );

    if (!paquete) {
      return res.status(404).json({ mensaje: "Paquete no encontrado" });
    }
    res.json(paquete);
  } catch (error) {
    res
      .status(400)
      .json({
        mensaje: "Error al cambiar estado del paquete",
        error: error.message,
      });
  }
});

// DELETE eliminar paquete
router.delete("/:id", async (req, res) => {
  try {
    const paquete = await Paquete.findByIdAndDelete(req.params.id);
    if (!paquete) {
      return res.status(404).json({ mensaje: "Paquete no encontrado" });
    }
    res.json({ mensaje: "Paquete eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar paquete", error: error.message });
  }
});

module.exports = router;
