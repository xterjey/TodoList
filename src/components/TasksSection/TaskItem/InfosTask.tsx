import React, { useEffect, useState } from "react";
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

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
  onTimerEnd?: (taskId: string) => void; // New prop
}

const InfosTask: React.FC<InfosTaskProps> = ({ task, isListInView1, onTimerEnd }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const dateFormatted = useDate(task.date || "");

  useEffect(() => {
    const key = `endTime_${task.title}`;
    const savedEndTime = localStorage.getItem(key);
    const endTime = savedEndTime ? parseInt(savedEndTime, 10) : Date.now() + (task.timer ?? 0) * 3600000;

    if (task.timer) {
      localStorage.setItem(key, endTime.toString());
      const updateTimer = () => {
        const now = Date.now();
        const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));
        setRemainingTime(timeLeft);

        if (timeLeft <= 0) {
          localStorage.removeItem(key);
          if (onTimerEnd) onTimerEnd(task.id); // Call onTimerEnd with taskId
        }
      };

      updateTimer();
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    }
  }, [task.timer, task.title, onTimerEnd]);

  return (
    <div className={`flex flex-col ${isListInView1 ? "mr-6" : ""}`}>
      {/* Container for date and title */}
      <div className="flex flex-col mb-2">
        {dateFormatted && (
          <time className="flex items-center mb-1 text-slate-500 dark:text-slate-400">
            <Calendar className="mr-2 w-4 sm:w-5" /> {dateFormatted}
          </time>
        )}
        <span className="flex items-center font-medium dark:text-slate-200">
          <span className="mr-2">{task.title}</span>
          {task.link && (
            <img
              src={getFaviconUrl(task.link)}
              alt="favicon"
              className="h-6 w-6"
            />
          )}
        </span>
      </div>
      {[task.link, task.link1, task.link2, task.link3].map((link, index) =>
        link ? (
          <a
            key={index}
            href={link}
            title={getDomainName(link)}
            className={`block mb-2 text-slate-500 dark:text-slate-500 flex items-center ${isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getDomainName(link)}
          >
            {getDomainName(link)}
          </a>
        ) : null
      )}
      {task.timer && (
        <div className="mt-2 flex items-center">
          <span className="text-slate-500 dark:text-slate-400">Timer:</span>
          <span className="ml-2">{formatTime(remainingTime)}</span>
        </div>
      )}
    </div>
  );
};

export default InfosTask;
