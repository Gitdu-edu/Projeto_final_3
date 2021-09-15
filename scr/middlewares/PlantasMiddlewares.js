const mongoose = require("mongoose");
const Planta = require("../models/Planta");

const validaID = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ error: "Id Inválido" });
    return;
  }

  try {
    const planta = await Planta.findById(id);
    if(!planta){
        return res.status(404).send({msgMiddleware: "Planta não encontrada."})
    }
    res.planta = planta
  } catch (err) {
    return res.status(500).send({error: err})
  }

  next(); // pedindo pra continuar. senão da ruim
};

module.exports = { validaID };
