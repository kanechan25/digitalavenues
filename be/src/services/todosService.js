const db = require("../models/index");
import { Op } from "sequelize";

let getTodos = (start, end) => {
  return new Promise(async (resolve, reject) => {
    try {
      let todos = [];

      if (start && end) {
        todos = await db.Todos.findAll({
          where: {
            date: {
              [Op.between]: [start, end],
            },
          },
          order: ["date"],
        });
      }
      resolve(todos);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewTodos = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.title || !data.date || !data.id) {
        resolve({
          errCode: 1,
          message: "Missing required parameters",
        });
      } else {
        await db.Todos.create({
          id: data.id,
          title: data.title,
          date: data.date,
        });
      }
      resolve({
        errCode: 0,
        message: "OK! A new todos task is created successful!",
        todos: {
          id: data.id,
          title: data.title,
          date: data.date,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteTodos = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let todos = await db.Todos.findOne({
        where: { id: id },
        raw: false,
      });
      if (!todos) {
        resolve({
          errCode: 3,
          message: `The todos is not exist!`,
        });
      } else {
        await todos.destroy();
      }
      resolve({
        errCode: 0,
        message: `The todos is deleted successful!`,
        todos: id,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateTodos = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let todos = await db.Todos.findOne({
        where: { id: id },
        raw: false,
      });
      if (todos) {
        todos.state = true;
        await todos.save();
        resolve({
          errCode: 0,
          message: `The todos is updated Completed state successful!`,
        });
      } else {
        resolve({
          errCode: 2,
          message: `The todos is not found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTodos,
  createNewTodos,
  deleteTodos,
  updateTodos,
};
