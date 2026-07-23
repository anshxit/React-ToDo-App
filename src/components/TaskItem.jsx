function TaskItem({
  item,
  toggleTask,
  editTask,
  deleteTask,
}) {
  return (
    <li
      onClick={() => toggleTask(item.originalIndex)}
      style={{
        textDecoration: item.completed ? "line-through" : "none",
        cursor: "pointer",
      }}
    >
      {item.text}

      <button
        onClick={(event) => {
          event.stopPropagation();
          editTask(item.originalIndex);
        }}
      >
        ✏️
      </button>

      <button
        onClick={(event) => {
          event.stopPropagation();
          deleteTask(item.originalIndex);
        }}
      >
        🗑️
      </button>
    </li>
  );
}

export default TaskItem;