import express from "express";
import todosController from "../controllers/todosController";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/api/todos", todosController.handleGetTodos);
  router.post("/api/todos", todosController.handleCreateNewTodos);
  router.delete("/api/todos/:id", todosController.handleDeleteTodos);
  router.put("/api/todos/:id", todosController.handleUpdateTodos);

  return app.use("/", router);
};

module.exports = initWebRoutes;
