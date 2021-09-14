//const mongoose = require("mongoose");

const { plugin } = require("mongoose");
const Planta = require("../models/Planta");

const validaID = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ error: "Id Inválido" });
    return;
  }

  try { // TENTE
    const Plantas = await Planta.findById(id); // promisse - pesq. ao banco de dados. ex: 2º plano
    if(!Planta){
        return res.status(404).send({msgMiddleware: "Planta não encontrado."})
    }
    res.personagem = personagem
  } catch (err) {
    return res.status(500).send({error: err})
  }

  next();
};

module.exports = { validaID };