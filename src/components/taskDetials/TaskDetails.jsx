import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BASE_END_POINT } from "../../constants";
import { formatDate } from "../utility/helper";
import { useSelector } from "react-redux";

const TaskDetails = () => {
  const { id } = useParams();
  const {
    data: task,
    loading,
    error,
  } = useFetch(`${BASE_END_POINT}/api/tasks/${id}`);
  const currentMode = useSelector((state) => state.theme.mode);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  const dateOptions = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return (
    <div
      className={`container ${
        currentMode === "dark" ? "bg-black text-light" : ""
      }`}
    >
      <h1 className="text-center">Task Details</h1>
      <div
        className={`card shadow mb-4 ${
          currentMode === "dark" ? "text-light" : ""
        }`}
        style={
          currentMode === "dark" ? { backgroundColor: "rgb(33 33 34" } : {}
        }
      >
        <div className="card-body">
          <h4>Title</h4>
          <p>{task.title}</p>

          <h4>Description</h4>
          <p>{task.description}</p>

          <h4>Due Date</h4>
          <p>
            {formatDate(task.dueDate, "en-US", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>

          <h4>Status</h4>
          <p>{task.status}</p>

          <h4>Priority</h4>
          <p>{task.priority}</p>

          <h4>Created at</h4>
          <p>{formatDate(task.created_at, "en-GB", dateOptions)}</p>

          <h4>Updated at</h4>
          <p>{formatDate(task.updated_at, "en-GB", dateOptions)}</p>

          <Link
            to="/"
            className={`btn btn-secondary ${
              currentMode === "dark" ? "bg-dark border-black text-white" : ""
            }`}
          >
            Back to Task List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
