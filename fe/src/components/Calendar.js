import React, { useEffect, useState } from "react";
import { format, startOfWeek, isSameDay, lastDayOfWeek, addWeeks, subWeeks } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { todosSlice } from "../redux";
import TodosItem from "./TodosItem";
import ModalCreateItem from "./ModalCreateItem";
import { getTodosService } from "../services/todoService";
import { getDaysArray } from "../common/helper";
import { utcToZonedTime } from "date-fns-tz";

const Calendar = () => {
  // state and variables
  const dispatch = useDispatch();
  const todosListStore = useSelector((state) => state.todosData.dataWeekly);
  const [todosList, setTodosList] = useState(todosListStore);
  const [currentMonth, setCurrentMonth] = useState(utcToZonedTime(new Date(), "Etc/UTC"));
  const [dateClickAdd, setDateClickAdd] = useState(utcToZonedTime(new Date(), "Etc/UTC"));
  const [openModal, setOpenModal] = useState(false);
  const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
  const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
  const isInthePast = format(endDate, "T") < format(Date.now(), "T");

  // handling function

  useEffect(() => {
    const start = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const end = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const fetchTodosList = async () => {
      const getTodosList = await getTodosService({ start: start, end: end });
      if (getTodosList) {
        setTodosList(getTodosList.data?.todos);
      }
    };
    fetchTodosList();
  }, [currentMonth, dispatch]);

  useEffect(() => {
    if (todosList) {
      dispatch(todosSlice.actions.updateTodosData(todosList));
    }
  }, [dispatch, todosList, todosListStore]);

  const handleChangeWeeks = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
    }
  };
  const handleAddItem = (date) => {
    setOpenModal(true);
    setDateClickAdd(date);
  };

  // All JSX components
  const Container = React.memo(() => {
    return (
      <div className="">
        <h1 className="text-decoration-underline fw-bold">AWESOME TO-DO APP</h1>
        <span className="fw-bold">{format(currentMonth, "MMMM yyyy")}</span>
        <RenderTodos />
      </div>
    );
  });
  const RenderTodos = React.memo(() => {
    const todosThisWeek = getDaysArray(startDate, endDate, todosList);
    return (
      <div className="d-flex mt-4 w-100">
        {todosThisWeek &&
          todosThisWeek.map((weekday) => {
            const day = new Date(weekday.day);
            return (
              <table key={weekday.day} className="table table-white border-end border-start w-100">
                <thead className="w-100 border-bottom ">
                  <tr className="fs-6">{format(day, "EEE").toUpperCase()}</tr>
                  <tr className=" w-100 fs-3 d-flex justify-content-center pb-2">
                    <div className={isSameDay(day, new Date()) ? "bg-primary week-day" : "week-day"}>
                      {format(day, "d")}
                    </div>
                  </tr>
                </thead>
                <tbody className="fs-6 w-100">
                  {weekday.tasks.map((task) => (
                    <div className="task day-row border-top" key={task.id}>
                      <TodosItem task={task} todosList={todosList} setTodosList={setTodosList} />
                    </div>
                  ))}
                  {!isInthePast && (
                    <div className="task day-row border-top ">
                      <div className="w-100">
                        <div onClick={() => handleAddItem(day)} className="task-add-btn px-2 py-1 rounded-1">
                          Add Item
                        </div>
                      </div>
                    </div>
                  )}
                  <tr className="task day-last-row border-end border-start"></tr>
                </tbody>
              </table>
            );
          })}
      </div>
    );
  });
  const Footer = React.memo(() => {
    return (
      <div className="row">
        <div className="col d-flex flex-row justify-content-between mt-4">
          <button className="btn btn-success" onClick={() => handleChangeWeeks("prev")}>
            Previous
          </button>
          <button className="btn btn-success" onClick={() => handleChangeWeeks("next")}>
            Next
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className="calendar-container container position-relative d-flex flex-column justify-content-between ">
      {openModal && (
        <ModalCreateItem
          setOpenModal={setOpenModal}
          date={dateClickAdd}
          todosList={todosList}
          setTodosList={setTodosList}
        />
      )}
      <Container />
      <Footer />
    </div>
  );
};

export default Calendar;
