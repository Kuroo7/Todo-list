import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";


const TaskList = () => {
    const [modal, setModal] = useState(false);
    const[taskList,setTaskList] = useState([]);


    useEffect(()=>{
        let arr=localStorage.getItem('taskList')
        if(arr){
            let obj =JSON.parse(arr)
            setTaskList(obj)
        }
    },[])

    const toggle = () => setModal(!modal);

    const saveTask=(taskObj)=>{
        const updatedTaskList = [...taskList, taskObj];
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
        setTaskList(updatedTaskList);
        setModal(false);
    }
    
    const deleteTask=(index)=>{
        const updatedTaskList = [...taskList];
        updatedTaskList.splice(index, 1);
        setTaskList(updatedTaskList);
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
        
    }
    const updateListArray=(obj,index)=>{
        const updatedTaskList = taskList.map((task, i) => (i === index ? obj : task));
        setTaskList(updatedTaskList);
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    
    }

  return (
    <>
    <div className="header text-center" >
        <h1>Todo List</h1>
        <button className="btn btn-primary mt-2 " onClick={()=>setModal(true)} >Create Task</button>
    </div>
    
    <div className="task-container align-items-center ">
                {taskList.length <1 ? (
                     <div className=" alert alert-info py-3 text-center" style={{"width":"100%"}} >
                     No tasks to show. Create one above!
                 </div>
                ) : (
                    taskList.map((obj, index) => (
                        <TaskItem
                            key={index}
                            taskObj={obj}
                            index={index}
                            deleteTask={deleteTask}
                            updateListArray={updateListArray}
                        />
                    ))
                )}
            </div>
    <TaskForm toggle={toggle} modal={modal} save={saveTask}  />
    
    </>
  )
}

export default TaskList