
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

//PUT para agentes
router.put('/:id', async(req, res) =>{
        const dato = await agentes.findOneAndUpdate({
                id: req.params.id}, req.body, {new: true                
            });
        if (dato){
            res.json(dato);
        }
        else{
            res.status(404).json({error: "No se encontro el elemento para actualizar"});
        }
    }
);

//DELETE para agentes
router.delete('/:id', async(req, res) =>{
        const dato = await agentes.findOneAndDelete({id: req.params.id});
        if (dato) {
            res.status(200).json({mensaje: "El elemento fue eliminado"});
        }
        else{
            res.status(404).json({error: "No se encontro el elemento"});
        }
    }
);

module.exports = router;