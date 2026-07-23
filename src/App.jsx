import {useState, useEffect} from 'react';
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskStats from "./components/TaskStats";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

function App(){
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");

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

  const filteredTasks = tasks.map((item, index) => ({ ...item, originalIndex :index })).filter((item) => {
    if (filter === "active") {
      return !item.completed;
    } else if (filter === "completed") {
      return item.completed;
    }
    return true; 
  });

  return(
    <div className="container">
      <Header />

      <TaskInput
        task={task}
        setTask={setTask}
        addTask={addTask}
        editIndex={editIndex}
      />
      
      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        remainingTasks={remainingTasks}
      />

      <FilterButtons
        filter={filter}
        setFilter={setFilter}
      />

      <TaskList
        filteredTasks={filteredTasks}
        filter={filter}
        toggleTask={toggleTask}
        editTask={editTask}
        deleteTask={deleteTask}
      />

     <Footer clearAllTasks={clearAllTasks} />
    </div>
  );
}

export default App;