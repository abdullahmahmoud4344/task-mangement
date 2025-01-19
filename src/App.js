import { Route, Routes } from "react-router-dom";
import TaskContainer from "./components/TaskContainer";
import TaskCreationForm from "./components/TaskCreationForm";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import TaskDetails from "./components/taskDetials/TaskDetails";
import "./App.css";
import ThemeMode from "./components/common/ThemeMode";

function App() {
  return (
    <main>
      <ToastContainer />
      <ThemeMode />
      <Routes>
        <Route path="/" Component={TaskContainer}></Route>
        <Route path="/dashboard" Component={TaskContainer}></Route>
        <Route path="/tasks/create" Component={TaskCreationForm}></Route>
        <Route path="/tasks/:id" Component={TaskDetails}></Route>
      </Routes>
    </main>
  );
}

export default App;
