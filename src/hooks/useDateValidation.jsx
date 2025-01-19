import { useState } from "react";

const useDateValidation = () => {
  const [error, setError] = useState("");

  const validateDate = (dateString) => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);

    if (!dateString) {
      setError("Date is required.");
      return false;
    }

    if (inputDate < currentDate) {
      setError("Due date cannot be in the past.");
      return false;
    }

    setError("");
    return true;
  };

  return { error, validateDate, setError };
};

export default useDateValidation;
