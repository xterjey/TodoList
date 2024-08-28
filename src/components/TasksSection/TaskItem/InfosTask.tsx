import React from "react";
import { Task } from "../../../interfaces";
import { ReactComponent as Calendar } from "../../../assets/date.svg";
import useDate from "../../hooks/useDate";

const InfosTask: React.FC<{ task: Task; isListInView1: boolean }> = ({
  task,
  isListInView1,
}) => {
  const dateFormatted = useDate(task.date || ""); // Handle empty date

  return (
    <div className={`flex flex-col flex-1 ${isListInView1 ? "mr-6" : ""}`}>
      <div className={`flex items-center justify-between ${isListInView1 ? "mb-1" : "mb-2"}`}>
        <span className="block font-medium dark:text-slate-200">
          {task.title}
        </span>
      </div>
      <a
        href={task.link}
        title={task.link}
        className={`description mb-2 text-slate-500 dark:text-slate-500 ${isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {task.link}
      </a>
      {task.link1 && (
        <a
          href={task.link1}
          title={task.link1}
          className="block mb-2 text-slate-500 dark:text-slate-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          {task.link1}
        </a>
      )}
      {task.link2 && (
        <a
          href={task.link2}
          title={task.link2}
          className="block mb-2 text-slate-500 dark:text-slate-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          {task.link2}
        </a>
      )}
      {task.link3 && (
        <a
          href={task.link3}
          title={task.link3}
          className="block mb-2 text-slate-500 dark:text-slate-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          {task.link3}
        </a>
      )}
      {dateFormatted && (
        <time className="mt-auto flex w-full">
          <Calendar className="mr-2 w-4 sm:w-5" /> {dateFormatted}
        </time>
      )}
    </div>
  );
};

export default InfosTask;
