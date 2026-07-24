import { useRef, useEffect } from "react";
function TaskInput({
  task,
  setTask,
  addTask,
  editIndex,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (editIndex !== null) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editIndex]);

  return (
    <div className="input-section">
      <input
        ref={inputRef}
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