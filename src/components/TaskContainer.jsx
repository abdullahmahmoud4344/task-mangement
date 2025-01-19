import { useDispatch, useSelector } from "react-redux";
import Pagination from "./common/Pagination";
import { setTasks, setPage, setSort, setFilter } from "../store/taskSlice";
import { getFilteredTasks } from "./common/filter";
import _ from "lodash";
import useFetch from "../hooks/useFetch";
import { BASE_END_POINT } from "../constants";
import TaskList from "./taskList/TaskList";
import "./TaskContainer.css";

function TaskContainer() {
  const dispatch = useDispatch();
  const taskState = useSelector((state) => state.tasks);
  const currentMode = useSelector((state) => state.theme.mode);

  const filteredTasks = getFilteredTasks(
    taskState.tasks,
    taskState.currentFilters
  );

  useFetch(`${BASE_END_POINT}/api/tasks`, (tasks) =>
    dispatch(setTasks({ tasks }))
  );

  const handlePagination = (page) => {
    dispatch(setPage(page));
  };

  const handleSort = (path) => {
    let order = taskState.sortColumn.order === "asc" ? "desc" : "asc";
    if (taskState.sortColumn.path !== path) order = "asc";

    const sortedTasks = _.orderBy(taskState.tasks, [path], [order]);

    dispatch(setSort({ tasks: sortedTasks, sortColumn: { path, order } }));
  };

  const handleFilter = (filterName, filterValue) => {
    dispatch(setFilter({ filterName, filterValue }));
  };

  return (
    <div className={`col ${currentMode}`}>
      <TaskList
        taskState={{
          ...taskState,
          tasks: filteredTasks,
        }}
        onSort={handleSort}
        onFilter={handleFilter}
      />
      <Pagination
        itemCount={filteredTasks.length}
        pageSize={taskState.pageSize}
        onPageChange={handlePagination}
        currentPage={taskState.currentPage}
      />
    </div>
  );
}

export default TaskContainer;
