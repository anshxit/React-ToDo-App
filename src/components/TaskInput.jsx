function TaskInput({
  task,
  setTask,
  addTask,
  editIndex,
}) {
  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addTask();
          }
        }}
      />

      <button onClick={addTask}>
        {editIndex !== null ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default TaskInput;