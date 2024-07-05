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
        let tempList =taskList;
        tempList.push(taskObj);
        localStorage.setItem("taskList",JSON.stringify(tempList))
        setModal(false);
        setTaskList(tempList);
    }
    
    const deleteTask=(index)=>{
        let tempList=taskList;
        tempList.splice(index,1)
        localStorage.setItem("taskList",JSON.stringify(tempList)) 
        setTaskList(tempList)
        
    }
    const updateListArray=(obj,index)=>{
        let tempList =taskList
        tempList[index]=obj;
        localStorage.setItem("taskList",JSON.stringify(tempList)) 
        setTaskList(tempList)
        window.location.reload();
    }

  return (
    <>
    <div className="header text-center" >
        <h1>Todo List</h1>
        <button className="btn btn-primary mt-2 " onClick={()=>setModal(true)} >Create Task</button>
    </div>
    <div className="task-container" >
        {taskList.map((obj,index)=><TaskItem key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray}/>)}
    </div>
    <TaskForm toggle={toggle} modal={modal} save={saveTask}  />
    </>
  )
}

export default TaskList