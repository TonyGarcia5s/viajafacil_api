const express = require("express");
const router = express.Router();
const Cliente = require("../models/Cliente");

// GET todos los clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener clientes", error: error.message });
  }
});

// GET cliente por ID
router.get("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener cliente", error: error.message });
  }
});

// POST nuevo cliente
router.post("/", async (req, res) => {
  try {
    const nuevo = new Cliente(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al crear cliente", error: error.message });
  }
});

// PUT actualizar cliente
router.put("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al actualizar cliente", error: error.message });
  }
});

// DELETE eliminar cliente
router.delete("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json({ mensaje: "Cliente eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar cliente", error: error.message });
  }
});

module.exports = router;
