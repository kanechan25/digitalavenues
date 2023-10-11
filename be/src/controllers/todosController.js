const todosService = require("../services/todosService");
let handleGetTodos = async (req, res) => {
  let data = req.query;
  if (!data.start || !data.end) {
    return res.status(500).json({
      errCode: 4,
      errMessage: "Missing required parameters",
      todos,
    });
  }
  let todos = await todosService.getTodos(data.start, data.end);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK! Got Todos List!",
    todos,
  });
};

let handleCreateNewTodos = async (req, res) => {
  const data = req.body;
  let message = await todosService.createNewTodos(data);
  return res.status(200).json(message);
};

let handleDeleteTodos = async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await todosService.deleteTodos(req.params.id);
  return res.status(200).json(message);
};
let handleUpdateTodos = async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await todosService.updateTodos(req.params.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetTodos,
  handleCreateNewTodos,
  handleDeleteTodos,
  handleUpdateTodos,
};
