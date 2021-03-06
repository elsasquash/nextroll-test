import Api from "../utils/Api";
import moment from "moment";

const TASKS_ENDPOINT = "todos";

export default () => {
  const { get, post, remove, update } = Api();
  return {
    listTasks: async () => {
      const tasks = await get(TASKS_ENDPOINT);
      return tasks ? convertDates(tasks) : [];
    },

    createTask: (task) =>
      post(TASKS_ENDPOINT, {
        ...task,
        due_date: task.dueDate.format("Y-M-DTH:m:s.SSS"),
      }),

    deleteTask: (task) => remove(`${TASKS_ENDPOINT}/${task.id}`),

    updateTask: (task) =>
      update(`${TASKS_ENDPOINT}/${task.id}`, {
        ...task,
        due_date: task.dueDate.format("Y-M-DTH:m:s.SSS"),
      }),
  };
};

export const convertDates = (tasks) =>
  tasks.map((task) => ({
    ...task,
    dueDate: moment(task.due_date),
  }));
