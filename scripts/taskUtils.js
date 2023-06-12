//Read JSON FILE

const readTask = () => {
  return fetch("/tasks-data")
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error reading tasks from file:", error);
      return [];
    });
};

export { readTask };
