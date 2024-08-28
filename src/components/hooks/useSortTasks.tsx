import { useState, useEffect } from "react";
import { Task } from "../../interfaces";

const useSortTasks = (tasks: Task[]) => {
  const [sortedBy, setSortedBy] = useState<string>("");

  const [sortedTasks, setSortedTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    const toMilliseconds = (date?: string) => date ? Date.parse(date) : 0;

    const sortByDate = (order: "max-date" | "min-date"): Task[] => {
      const tasksCopy = [...tasks];
      const sorted = tasksCopy.sort((task1, task2) => {
        const date1 = toMilliseconds(task1.date);
        const date2 = toMilliseconds(task2.date);

        if (date1 < date2) {
          return -1;
        }
        if (date1 > date2) {
          return 1;
        }
        return 0;
      });

      if (order === "min-date") {
        return sorted;
      }

      if (order === "max-date") {
        return sorted.reverse();
      }

      return tasks; // Return original tasks if no valid order
    };

    const sortByCompletedStatus = (completed: boolean): Task[] => {
      const tasksCopy = [...tasks];
      const sorted = tasksCopy.sort((task1) => {
        return task1.completed === completed ? -1 : 1;
      });
      return sorted;
    };

    if (sortedBy === "min-date" || sortedBy === "max-date") {
      setSortedTasks(sortByDate(sortedBy));
    } else if (sortedBy === "" || sortedBy === "order-added") {
      setSortedTasks(tasks);
    } else if (sortedBy === "completed-first") {
      setSortedTasks(sortByCompletedStatus(true));
    } else if (sortedBy === "uncompleted-first") {
      setSortedTasks(sortByCompletedStatus(false));
    }
  }, [sortedBy, tasks]);

  return { sortedBy, setSortedBy, sortedTasks };
};

export default useSortTasks;
