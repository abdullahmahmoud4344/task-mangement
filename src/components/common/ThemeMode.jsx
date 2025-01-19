import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../store/themeSlice";
import { useEffect } from "react";

const ThemeMode = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector((state) => state.theme.mode);

  const handleThemeToggle = () => {
    const updatedMode = currentMode === "light" ? "dark" : "light";
    dispatch(setTheme(updatedMode));
  };

  useEffect(() => {
    currentMode === "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [currentMode]);

  const iconState = currentMode === "light" ? "off" : "on";

  return (
    <i
      onClick={handleThemeToggle}
      className={`bi bi-toggle-${iconState} theme-button`}
    ></i>
  );
};

export default ThemeMode;
