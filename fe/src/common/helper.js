export const getDaysArray = (start, end, todosData) => {
  if (todosData) {
    const arrDays = [];
    for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      const formattedDate = dt.toISOString().split("T")[0];
      const tasksForTheDay = todosData.filter((task) => task.date.startsWith(formattedDate));
      arrDays.push({
        day: new Date(dt),
        tasks: tasksForTheDay,
      });
    }
    return arrDays;
  }
  return [];
};
export const editStateByDate = (arrDays, targetId) => {
  if (arrDays) {
    return arrDays.map((day) => {
      if (day.id === targetId) {
        return {
          ...day,
          state: true,
        };
      }
      return day;
    });
  }
};

export const deleteTodosByDate = (arrDays, targetId) => {
  if (arrDays) {
    return arrDays.filter((item) => item.id !== targetId);
  }
};
export const createTodos = (arrDays, newTodos) => {
  if (arrDays) {
    return [...arrDays, newTodos];
  }
};
