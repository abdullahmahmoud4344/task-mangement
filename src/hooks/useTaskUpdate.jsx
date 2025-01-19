import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateTask } from "../store/taskSlice";
import { BASE_END_POINT } from "../constants";

const useTaskUpdate = () => {
  const dispatch = useDispatch();

  const fetchUpdateTask = async (updatedTask, tasks) => {
    try {
      const response = await fetch(
        `${BASE_END_POINT}/api/tasks/${updatedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const newTasks = tasks.map((oldTask) =>
        oldTask.id === updatedTask.id ? updatedTask : oldTask
      );

      dispatch(updateTask({ tasks: newTasks }));
      toast.success("Task has been updated");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return { fetchUpdateTask };
};

export default useTaskUpdate;
