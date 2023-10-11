import { httpRequest } from "../utils/httpRequest";

const getTodosService = async (data) => {
  return httpRequest.get(`/api/todos?start=${data.start}&end=${data.end}`);
};
const createTodosService = (data) => {
  return httpRequest.post("/api/todos", data);
};
const deleteTodosService = (id) => {
  return httpRequest.delete(`/api/todos/${id}`);
};
const updateTodosService = (id) => {
  return httpRequest.put(`/api/todos/${id}`);
};

export { getTodosService, createTodosService, deleteTodosService, updateTodosService };
