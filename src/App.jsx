import {useState} from 'react';

function App(){
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask(){
    if(task.trim() === ""){
      return;
    }

    setTasks([...tasks, task]);
    setTask("");
  }

  function deleteTask(indexToDelete){
    const updatedTasks = tasks.filter((item, index) => {return index !== indexToDelete});
    setTasks(updatedTasks);
  }
  return(
    <div className="container">
      <h1>React ToDo App</h1>

      <div className="input-section">
        <input type="text" placeholder="Enter a task..." value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={addTask}>Add</button>
      </div>
         <p>You typed: {task}</p>
      <ul>
        {tasks.map((item, index) => (<li key={index}>{item} <button onClick={() => deleteTask(index)}>Delete</button></li>))}
      </ul>
    </div>
  );
}

export default App;