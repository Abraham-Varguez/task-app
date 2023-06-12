import { readFileSync } from "fs";


//Read JSON FILE

const readTask = () => {
  try {
    const taskData = readFileSync("task.json", "utf-8");
    const tasks = JSON.parse(taskData);
    return tasks;
  } catch {
    console.log(`Error Reading tasks from file`);
    return [];
  }
};

export { readTask };
