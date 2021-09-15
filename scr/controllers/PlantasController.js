const Planta = require("../models/Planta");

const getAll = async (req, res) => {
  try { // TENTE
    const plantas = await Planta.find(); //promisse - pesq. ao banco de dados. ex: 2º plano
    if (plantas.length === 0)
      return res
        .status(404)
        .send({ message: "Não existem plantas cadastradas!" });
    return res.send({ plantas });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const planta = await Planta.findById(id);
    if (!planta) {
      res.status(404).json({ message: "Planta não encontrada" });
      return;
    }
    return res.send({ planta });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const create = async (req, res) => {
  const { nome, identidade, genero, imagem } = req.body;

  if (!nome || !identidade || !genero || !imagem) {
    res.status(400).send({
      message: "Você não enviou todos os dados necessários para o cadastro",
    });
    return;
  }

  const novoPlanta = await new Planta({
    nome,
    identidade,
    genero,
    imagem,
  });

  try {
    await novoPlanta.save();
    return res
      .status(201)
      .send({ message: "Planta criada com sucesso", novoPlanta });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const update = async (req, res) => {
  const { nome, identidade, genero, imagem } = req.body;

  if (!nome || !identidade || !genero || !imagem) {
    res.status(400).send({
      message: "Você não enviou todos os dados necessários para o cadastro",
    });
    return;
  }

  res.planta.nome = nome;
  res.planta.identidade = identidade;
  res.planta.genero = genero;
  res.planta.imagem = imagem;

  try {
    await res.planta.save();
    res.send({ message: "Planta alterada com sucesso!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const del = async (req, res) => {
  try {
    await res.planta.remove();
    return res.send({ message: "Planta removida com sucesso!" });
  } catch (err) {
    return res.status(500).send({ erro: err.message });
  }
};

const filterByName = async (req, res) => {
  const nome = req.query.nome;
  if (!nome) {
    res.status(400).send({ erro: "Parametro não recebido" });
    return;
  }
  try {// aqui
    const plantas = await Planta.find({ nome: { $regex: `${nome}` } });
    return res.send({ plantas });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const filterAll = async (req, res) => {
  let { nome, identidade, genero } = req.query;

  !nome ? (nome = "") : (nome = nome);
  !identidade ? (identidade = "") : (identidade = identidade);
  !genero ? (genero = "") : (genero = genero);

  try {
    const plantas = await Planta.find({
      nome: { $regex: `${nome}`, $options: 'i' },
      identidade: { $regex: `${identidade}`, $options: 'i'},
      genero: { $regex: `${genero}`, $options: 'i'},
    });

    if (plantas.length === 0)
      return res.status(404).send({ erro: "Planta não encontrada" });

    return res.send({ plantas });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  filterByName,
  filterAll,
};
