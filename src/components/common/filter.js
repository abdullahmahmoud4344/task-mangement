export const getFilteredTasks = (tasks, filters) => {
  const { status, priority, searchText } = filters;

  return tasks.filter((task) => {
    const matchesStatus = status ? task.status === status : true;
    const matchesPriority = priority ? task.priority === priority : true;
    const matchesSearchText = searchText
      ? task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase())
      : true;

    return matchesStatus && matchesPriority && matchesSearchText;
  });
};
