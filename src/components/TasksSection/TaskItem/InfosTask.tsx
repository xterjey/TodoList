import React from "react";
import { Task } from "../../../interfaces";
import { ReactComponent as Calendar } from "../../../assets/date.svg";
import useDate from "../../hooks/useDate";

// Utility functions
const getDomainName = (url: string) => {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '').split('.').slice(0, -1).join(' ');
  } catch (error) {
    console.error("Error extracting domain name:", error);
    return "Invalid URL";
  }
};

const getFaviconUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return `https://${domain}/favicon.ico`;
  } catch (error) {
    console.error("Error extracting favicon URL:", error);
    return "";
  }
};

interface InfosTaskProps {
  task: Task;
  isListInView1: boolean;
}

const InfosTask: React.FC<InfosTaskProps> = ({ task, isListInView1 }) => {
  const dateFormatted = useDate(task.date || "");

  return (
    <div className={`flex flex-col ${isListInView1 ? "mr-6" : ""}`}>
      {/* Container for date and title */}
      <div className="flex flex-col mb-2">
        {dateFormatted && (
          <time className="flex items-center mb-1 text-slate-500 dark:text-slate-400">
            <Calendar className="mr-2 w-4 sm:w-5" /> {dateFormatted}
          </time>
        )}
        <span className="flex items-center font-medium text-slate-800 dark:text-slate-200">
          <span className="mr-2">{task.title}</span>
          {task.url && (
            <img
              src={getFaviconUrl(task.url)}
              alt="favicon"
              className="h-6 w-6"
            />
          )}
        </span>
      </div>
      {task.url && (
        <a
          href={task.url}
          title={getDomainName(task.url)}
          className={`block mb-2 text-slate-800 dark:text-slate-200 flex items-center ${isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={getDomainName(task.url)}
        >
          {getDomainName(task.url)}
        </a>
      )}
      {[task.discord, task.blockchain, task.twitter, task.telegram].map((link, index) =>
        link ? (
          <a
            key={index}
            href={link}
            title={getDomainName(link)}
            className={`block mb-2 text-slate-800 dark:text-slate-200 flex items-center ${isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getDomainName(link)}
          >
            {getDomainName(link)}
          </a>
        ) : null
      )}

      {task.wallet && (
        <div className="mt-2 flex items-center">
          <span className="text-slate-800 dark:text-slate-200">Wallet:</span>
          <span className="ml-2">{task.wallet}</span>
        </div>
      )}
    </div>
  );
};

export default InfosTask;
