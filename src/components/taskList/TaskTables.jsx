import { formatDate, paginate } from "../utility/helper";
import { Link } from "react-router-dom";

const TaskTables = ({
  onSort,
  tasks,
  currentPage,
  pageSize,
  handleEditClick,
  currentMode,
}) => {
  const tableClass = currentMode === "dark" ? "table-dark" : "";
  const textClass = currentMode === "dark" ? "text-white" : "text-black";
  const backgroundClass = currentMode === "dark" ? "bg-dark" : "bg-light";

  return (
    <div className={`table-responsive ${backgroundClass}`}>
      <table className={`table table-bordered table-striped ${tableClass}`}>
        <thead className={tableClass}>
          <tr>
            <th
              onClick={() => onSort("id")}
              scope="col"
              className="cursor-pointer"
            >
              #
            </th>
            <th
              onClick={() => onSort("title")}
              scope="col"
              className="cursor-pointer"
            >
              Title
            </th>
            <th scope="col">Description</th>
            <th
              onClick={() => onSort("dueDate")}
              scope="col"
              className="cursor-pointer"
            >
              Due date
            </th>
            <th
              onClick={() => onSort("priority")}
              scope="col"
              className="cursor-pointer"
            >
              Priority
            </th>
            <th
              onClick={() => onSort("status")}
              scope="col"
              className="cursor-pointer"
            >
              Status
            </th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginate(tasks, currentPage, pageSize).map((task, index) => {
            return (
              <tr key={task.id} className={backgroundClass}>
                <th scope="row">
                  <Link
                    className={`text-decoration-none ${textClass}`}
                    to={`/tasks/${task.id}`}
                  >
                    {index + 1}
                  </Link>
                </th>
                <td className={textClass}>{task.title}</td>
                <td className={textClass}>{task.description}</td>
                <td className={textClass}>
                  {formatDate(task.dueDate, "en-US", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className={textClass}>{task.priority}</td>
                <td className={textClass}>{task.status}</td>
                <td>
                  <Link
                    to={"/"}
                    className={`text-decoration-none ${textClass}`}
                    onClick={() => handleEditClick(task)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTables;
