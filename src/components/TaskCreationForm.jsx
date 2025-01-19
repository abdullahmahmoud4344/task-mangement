import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useDateValidation from "../hooks/useDateValidation";
import { createTask } from "../store/taskSlice";
import { useDispatch } from "react-redux";
import { BASE_END_POINT } from "../constants";

const TaskCreationForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Pending",
  });

  const dispatch = useDispatch();

  const { error, validateDate } = useDateValidation();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dueDate" && !validateDate(value)) {
      return;
    }
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_END_POINT}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      dispatch(createTask({ tasks: task }));
      toast.success("New task has been created!");
      navigate("/");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Create Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            required
            value={task.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            required
            value={task.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            required
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>
        {error && <div className="alert alert-danger mt-2">{error}</div>}

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            className="form-select"
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskCreationForm;
