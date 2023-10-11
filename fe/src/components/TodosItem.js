import React from "react";
import checkmark from "../assets/images/checkmark.png";
import trashbin from "../assets/images/trashbin.png";
import { deleteTodosService, updateTodosService } from "../services/todoService";

import { deleteTodosByDate, editStateByDate } from "../common/helper";

const TodosItem = ({ task, todosList, setTodosList }) => {
  const { id, state, title } = task;
  if (state === true) {
    return (
      <div className="w-100">
        <div className="task-done px-2 py-1 rounded-1 ">{title}</div>
      </div>
    );
  }

  const handleToDone = () => {
    try {
      const updateTodosItem = async () => {
        await updateTodosService(id);
      };
      updateTodosItem();
      const updateTodosList = editStateByDate(todosList, id);
      setTodosList(updateTodosList);
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleToDelete = () => {
    try {
      const deleteTodosItem = async () => {
        await deleteTodosService(id);
      };
      deleteTodosItem();
      const deleteTodosList = deleteTodosByDate(todosList, id);
      setTodosList(deleteTodosList);
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className=" d-flex justify-content-between w-100 ">
      <img className="task-icon" onClick={handleToDone} src={checkmark} alt="check" />
      <div className="task-todos lh-1 p-0 px-1">{title}</div>
      <img className="task-icon" onClick={handleToDelete} src={trashbin} alt="trash" />
    </div>
  );
};

export default TodosItem;
