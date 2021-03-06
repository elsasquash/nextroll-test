import React from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskList from "./TaskList";

export default () => {
  const { completed, pending } = useTasks();

  return (
    <div style={styles.container}>
      <TaskList title="Pending" tasks={pending} />
      <TaskList title="Completed" tasks={completed} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContents: "space-between",
  },
};
