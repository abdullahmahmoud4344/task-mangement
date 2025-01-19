import React from "react";
import "./TaskList.css";
import EditTask from "../TaskEdit";
import useTaskUpdate from "../../hooks/useTaskUpdate";
import TaskFilters from "./TaskFilters";
import TaskTables from "./TaskTables";
import { useSelector } from "react-redux";

const TaskList = ({ taskState, onSort, onFilter }) => {
  const { tasks, error, isLoading, currentPage, pageSize, currentFilters } =
    taskState;

  const currentMode = useSelector((state) => state.theme.mode);

  const { fetchUpdateTask } = useTaskUpdate();

  const [selectedTask, setSelectedTask] = React.useState(null);

  if (isLoading && !error) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div className="danger"> The following error occured {error}</div>;
  }

  const handleEditClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = (task) => {
    setSelectedTask(null);
  };

  return (
    <div className="container py-4">
      <h1
        className={`mb-4 text-center ${
          currentMode === "dark" ? "text-white" : ""
        }`}
      >
        Task Manager
      </h1>

      <TaskFilters
        currentMode={currentMode}
        currentFilters={currentFilters}
        onFilter={onFilter}
      />

      <TaskTables
        onSort={onSort}
        tasks={tasks}
        currentPage={currentPage}
        pageSize={pageSize}
        handleEditClick={handleEditClick}
        currentMode={currentMode}
      />

      {selectedTask && (
        <EditTask
          currentMode={currentMode}
          handleClose={handleCloseModal}
          selectedTask={selectedTask}
          updateTask={(updatedTask) => fetchUpdateTask(updatedTask, tasks)}
        />
      )}
    </div>
  );
};

export default TaskList;
