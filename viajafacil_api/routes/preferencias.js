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

//PUT para preferencias
router.put('/:id', async(req, res) =>{
        const datoPref = await preferencias.findOneAndUpdate({
                id: req.params.id}, req.body, {new: true                
            });
        if (dato){
            res.json(datoPref);
        }
        else{
            res.status(404).json({error: "No se encontro el elemento para actualizar"});
        }
    }
);

//DELETE para preferencias
router.delete('/:id', async(req, res) =>{
        const datoPref = await preferencias.findOneAndDelete({id: req.params.id});
        if (datoPref) {
            res.status(200).json({mensaje: "El elemento fue eliminado"});
        }
        else{
            res.status(404).json({error: "No se encontro el elemento"});
        }
    }
);

module.exports = router;
