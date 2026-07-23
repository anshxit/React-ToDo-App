import TaskItem from "./TaskItem";

function TaskList({
  filteredTasks,
  filter,
  toggleTask,
  editTask,
  deleteTask,
}) {
  return (
    <ul>
      {filteredTasks.length === 0 ? (
        <p>
          {filter === "all" && "No tasks yet. Add your first task 🚀"}
          {filter === "active" && "No active tasks 🎉"}
          {filter === "completed" && "No completed tasks yet ✅"}
        </p>
      ) : (
        filteredTasks.map((item) => (
          <TaskItem
            key={item.originalIndex}
            item={item}
            toggleTask={toggleTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))
      )}
    </ul>
  );
}

export default TaskList;