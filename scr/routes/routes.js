const routes = require("express").Router();

const PlantaController = require("../controllers/PersonagensController");
const PlantaMiddleware = require("../middlewares/PlantaMiddlewares");

routes.get("/plantas", PlantaController.getAll);
routes.get(
  "/plantas/:id",
  PlantaMiddleware.validaID,
  PlantaController.getById
);
routes.post("/plantas", PlantaController.create);
routes.put(
  "/plantas/:id",
  PlantaMiddleware.validaID,
  PlantaController.update
);
routes.delete(
  "/plantas/:id",
  PlantaMiddleware.validaID,
  PlantaController.del
);
routes.get("/filterByName", PlantaController.filterByName);
routes.get("/filterAll", PlantaController.filterAll);

module.exports = routes;
