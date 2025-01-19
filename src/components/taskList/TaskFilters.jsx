import React from "react";
import { Link } from "react-router-dom";

const TaskFilters = ({ currentFilters, onFilter, currentMode }) => {
  return (
    <div
      className={`card shadow mb-4 ${
        currentMode === "dark" ? "bg-dark text-white" : ""
      }`}
    >
      <div className={`card-body ${currentMode === "dark" ? "bg-dark" : ""}`}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className={`form-control ${
                currentMode === "dark" ? "bg-dark text-white" : ""
              }`}
              placeholder="Search by title or description"
              onChange={(e) => onFilter("searchText", e.target.value)}
              value={currentFilters.searchText || ""}
            />
          </div>

          <div className="col-md-2 mb-3">
            <select
              className={`form-select ${
                currentMode === "dark" ? "bg-dark text-white" : ""
              }`}
              value={currentFilters.priority || ""}
              onChange={(e) => onFilter("priority", e.target.value)}
            >
              <option value="">Filter by Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="col-md-2 mb-3">
            <select
              className={`form-select ${
                currentMode === "dark" ? "bg-dark text-white" : ""
              }`}
              value={currentFilters.status || ""}
              onChange={(e) => onFilter("status", e.target.value)}
            >
              <option value="">Filter by Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="col-md-2 mb-3">
            <button
              className={`btn btn-secondary w-100 ${
                currentMode === "dark" ? "bg-dark text-white border-white" : ""
              }`}
              onClick={() => {
                onFilter("status", "");
                onFilter("priority", "");
                onFilter("searchText", "");
              }}
            >
              Clear Filters
            </button>
          </div>

          <div className="col-md-2 mb-3">
            <Link
              to={"/tasks/create"}
              className={`btn btn-dark w-100 text-white text-decoration-none ${
                currentMode === "dark" ? "bg-dark border-white" : ""
              }`}
            >
              Create task
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
