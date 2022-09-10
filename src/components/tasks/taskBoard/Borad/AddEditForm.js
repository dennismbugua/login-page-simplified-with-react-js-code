import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SelectBoxSearch from "../../../common/SelectBoxSearch";
import { tasks } from "../../../../datas/tasks";

// ======================================= Add Edit Form-2 ===========================================..
const AddEditForm = ({ toggleAddEditFormClose, selectedTask }) => {
  const [task, setTask] = useState(null);
  const [taskPriority, setTaskPriority] = useState(null);
  const [dueDate, setDueDate] = useState(new Date());
  const [taskFollowers, setTaskFollowers] = useState([]);

  useEffect(() => {
    if (selectedTask) {
      console.log("not null");
      setTask(selectedTask.taskTitle);
      setTaskPriority(selectedTask.priority);
      //   setDueDate(dueDate);
    } else {
      setTask(null);
      setTaskPriority(null);
      setDueDate(null);
    }
  }, [selectedTask]);

  //   Functions.

  const handleTaskFollowers = (user) => {
    console.log(user);
  };

  return (
    <Form>
      <FormGroup>
        <Label>Task</Label>
        <Input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Task Priority </Label>
        <Input type="select" onChange={(e) => setTaskPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Due Date</Label>
        <Input type="date" onChange={(e) => setDueDate(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Task Followers </Label>
        <SelectBoxSearch
          options={[]}
          onchange={handleTaskFollowers}
        ></SelectBoxSearch>
      </FormGroup>
      <div className="text-center">
        <Button outline color="info" className="">
          Submit
        </Button>
        <Button
          outline
          color="danger"
          className="ml-2"
          onClick={toggleAddEditFormClose}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default AddEditForm;
