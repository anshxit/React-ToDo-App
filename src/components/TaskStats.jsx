function TaskStats({
  task,
  totalTasks,
  completedTasks,
  remainingTasks,
}) {
  return (
    <>
      <p>You typed: {task}</p>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <p>Remaining Tasks: {remainingTasks}</p>
    </>
  );
}

export default TaskStats;