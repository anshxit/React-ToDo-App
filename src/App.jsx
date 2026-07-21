import {useState, useEffect} from 'react';

function App(){
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
  console.log("Saving tasks:", tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(){
    if(task.trim() === ""){
      return;
    }
    const duplicateTask = tasks.some(
     (item, index) =>
     item.text.toLowerCase() === task.trim().toLowerCase() &&
     index !== editIndex
    );

    if (duplicateTask) {
      alert("Task already exists!");
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = tasks.map((item, index) => {
        if (index === editIndex) {
          return { ...item, text: task };
        }
        return item;
      });
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }
    setTask("");
  }

  function deleteTask(indexToDelete){
    const updatedTasks = tasks.filter((item, index) => {return index !== indexToDelete});
    setTasks(updatedTasks);
  }

  function toggleTask(indexToToggle){
    const updatedTasks = tasks.map((item, index) => {
      if(index === indexToToggle){
        return {...item, completed: !item.completed};
      }
      return item;
    });
    setTasks(updatedTasks);
  }

  function clearAllTasks(){
    const confirmClear = window.confirm("Are you sure you want to clear all tasks?");
    if (!confirmClear) {
      return;
    }
    setTasks([]);
  }

  function editTask(indexToEdit) {
  setTask(tasks[indexToEdit].text);
  setEditIndex(indexToEdit);
}

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((item) => item.completed).length;
  const remainingTasks = totalTasks - completedTasks;

  return(
    <div className="container">
      <h1>React ToDo App</h1>

      <div className="input-section">
        <input type="text" placeholder="Enter a task..." value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(event) => {if(event.key==="Enter"){addTask();}}} />
        <button onClick={addTask}>
        {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
         <p>You typed: {task}</p>
         <p>Total Tasks: {totalTasks}</p>
         <p>Completed Tasks: {completedTasks}</p>
         <p>Remaining Tasks: {remainingTasks}</p>
      <ul>
        {tasks.length === 0?(<p>No tasks yet. Add your first task 🚀</p>):(
        tasks.map((item, index) => (<li key={index} onClick={() => toggleTask(index)} style={{textDecoration: item.completed ? "line-through" : "none",cursor: "pointer"}}>
          {item.text} 
          <button onClick={(event) => {
           event.stopPropagation();
           editTask(index);
          }}
          >
          ✏️
         </button>

        <button onClick={(event) => {
         event.stopPropagation();
         deleteTask(index);
        }}
        >
         🗑️
        </button>
        </li>)))}
      </ul>

      <button className="clear-btn" onClick={clearAllTasks}>Clear All Tasks</button>
    </div>
  );
}

export default App;