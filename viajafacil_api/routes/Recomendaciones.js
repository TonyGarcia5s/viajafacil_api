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

//PUT para recomendaciones
router.put('/:id', async(req, res) =>{
        const datorec = await recomendaciones.findOneAndUpdate({
                id: req.params.id}, req.body, {new: true                
            });
        if (dato){
            res.json(datorec);
        }
        else{
            res.status(404).json({error: "No se encontro el elemento para actualizar"});
        }
    }
);

//DELETE para recomendaciones
router.delete('/:id', async(req, res) =>{
        const datorec = await recomendaciones.findOneAndDelete({id: req.params.id});
        if (datorec) {
            res.status(200).json({mensaje: "El elemento fue eliminado"});
        }
        else{
            res.status(404).json({error: "No se encontro el elemento"});
        }
    }
);

module.exports = router;