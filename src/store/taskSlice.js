import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  error: null,
  isLoading: false,
  pageSize: 10,
  currentPage: 1,
  sortColumn: { path: "id", order: "asc" },
  currentFilters: {
    status: "",
    priority: "",
    searchText: "",
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.isLoading = false;
      state.tasks = action.payload.tasks;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setSort(state, action) {
      state.sortColumn = action.payload.sortColumn;
      state.tasks = action.payload.tasks;
    },
    setFilter(state, action) {
      state.currentFilters = {
        ...state.currentFilters,
        [action.payload.filterName]: action.payload.filterValue,
      };
      state.currentPage = 1;
    },

    updateTask(state, action) {
      state.tasks = action.payload.tasks;
    },

    createTask(state, action) {
      const newTasks = [...state.tasks, action.payload.tasks];
      state.tasks = newTasks;
    },
  },
});

export const { setTasks, setPage, setSort, setFilter, updateTask, createTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
