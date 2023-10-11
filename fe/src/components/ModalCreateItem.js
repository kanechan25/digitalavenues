import React, { useState } from "react";
import { createTodosService } from "../services/todoService";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { createTodos } from "../common/helper";

const ModalCreateItem = ({ setOpenModal, date, todosList, setTodosList }) => {
  const [dateSelected, setDateSelected] = useState(date);
  const [title, setTitle] = useState("");
  const handleAddItem = () => {
    if (title) {
      const uuid = uuidv4();
      try {
        const data = { title: title, date: dateSelected, id: uuid };
        const createTodosItem = async () => {
          await createTodosService(data);
        };
        createTodosItem();

        const newTodos = {
          id: uuid,
          title: title,
          date: dateSelected.toISOString(),
          state: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const updateTodosList = createTodos(todosList, newTodos);
        setTodosList(updateTodosList);
      } catch (error) {
        throw new Error(error);
      }
      setOpenModal(false);
    }
  };

  return (
    <div className="modal-container d-flex position-absolute justify-content-center align-items-center">
      <div className="d-flex flex-column bg-white border border-2 p-3 rounded-3 ">
        <form>
          <header className="d-flex justify-content-between fs-6">
            <DatePicker
              selected={dateSelected}
              onChange={(date) => setDateSelected(date)}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 5)}
              showDisabledMonthNavigation
            />
            <div
              className="bg-warning fs-6 p-1 rounded-3 cursor-pointer btn-close "
              onClick={() => setOpenModal(false)}
            ></div>
          </header>
          <div className="my-4 fs-6">
            <div>
              <label className="me-2">Title </label>
              <input
                className="rounded-2 px-1"
                type="text"
                autofocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {!title && <span className="text-danger">You need a title to add an item!</span>}
          </div>
        </form>
        <div className="bg-success fs-5 text-white py-2 rounded-3 cursor-pointer" onClick={handleAddItem}>
          Add Item
        </div>
      </div>
    </div>
  );
};

export default ModalCreateItem;
