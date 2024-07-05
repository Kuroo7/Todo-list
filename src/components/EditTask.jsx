/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react'
import {Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'


const EditTask = ({modal,toggle ,updateTask,taskObj }) => {
  const [taskName,setTaskName] = useState("");
  const [description,setDescription] = useState("");
  const [isChecked,setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleChange=(e)=>{
      const{name,value,checked}=e.target;
      if(name==="taskName"){
        setTaskName(value)
      }
      else if(name==="description"){
        setDescription(value)
      }
      else if(name==="status"){
        setIsChecked(checked)
      }
  }


  useEffect(()=>{
      setTaskName(taskObj.Name)
      setDescription(taskObj.Description)
      setIsChecked(taskObj.status)

  },[])

  const handleUpdate=(e)=>{
    e.preventDefault();
    let tempObj={}
    tempObj={
      "Name":taskName,
      "Description":description,
      "status":isChecked
    }
    updateTask(tempObj)

  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Task</ModalHeader>
        <ModalBody>
          <form>
            <div className='form-group'>
              <label>Update Task Name</label>
              <input type="text" className='form-control' value={taskName} onChange={handleChange} name="taskName"  />
            </div>
            <div className='form-group mt-2'>
              <label>Update Description</label>
              <textarea rows="5" className='form-control ' value={description} onChange={handleChange} name="description" />
            </div>
            <div className="container d-flex">
              <div className="form-check d-flex align-items-center">
                <input
                name='status'
                  className="form-check-input"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </div>
              <p className="mb-0 ms-1">Task is {isChecked ? 'Done' : 'To Do'}.</p>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
  )
}

export default EditTask