import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import useDateValidation from "../hooks/useDateValidation";
import { formatDate } from "./utility/helper";
import "./TaskEdit.css";

const EditTask = ({ handleClose, updateTask, selectedTask, currentMode }) => {
  const [task, setTask] = useState(selectedTask);
  const [isDisabled, setIsDisabled] = useState(true);

  const { error, validateDate } = useDateValidation();

  const handleInputChange = (e) => {
    setIsDisabled(false);

    const { name, value } = e.target;

    if (name === "dueDate" && !validateDate(value)) {
      setIsDisabled(true);
      return;
    }

    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleModalClose = () => {
    setIsDisabled(true);
    handleClose();
  };

  const handleSave = () => {
    setIsDisabled(true);
    updateTask(task);
    handleClose();
  };

  const modalClass = currentMode === "dark" ? "modal-dark" : "";

  return (
    <Modal show={selectedTask} onHide={handleClose} className={modalClass}>
      <Modal.Header closeButton onClick={handleModalClose}>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
            />
          </Form.Group>

          <Form.Group controlId="taskDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={task.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
            />
          </Form.Group>

          <Form.Group controlId="taskDueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formatDate(task.dueDate, "en-CA")}
              onChange={handleInputChange}
            />
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
          </Form.Group>

          <Form.Group controlId="taskPriority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={task.priority}
              onChange={handleInputChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="taskStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={task.status}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button disabled={isDisabled} variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTask;
