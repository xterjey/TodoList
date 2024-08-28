import React, { useEffect, useRef, useState } from "react";
import { Task } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";
import Modal from "./Modal";

const InputCheckbox: React.FC<{
  label: string;
  isChecked: boolean;
  setChecked: (value: React.SetStateAction<boolean>) => void;
}> = ({ isChecked, setChecked, label }) => {
  return (
    <label className="mb-0 flex items-center cursor-pointer">
      <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
        {isChecked && (
          <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
        )}
      </div>
      <span className="order-1 flex-1">{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev) => !prev)}
      />
    </label>
  );
};

const ModalCreateTask: React.FC<{
  onClose: () => void;
  task?: Task;
  nameForm: string;
  onConfirm: (task: Task) => void;
}> = ({ onClose, task, nameForm, onConfirm }) => {
  const directories = useAppSelector((state) => state.tasks.directories);

  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();

  const todayDate = `${year}-${month}-${day}`;
  const maxDate = `${year + 1}-${month}-${day}`;

  const [title, setTitle] = useState<string>(task?.title || "");
  const [date, setDate] = useState<string>(task?.date || todayDate);
  const [link, setLink] = useState<string>(task?.link || "");
  const [link1, setLink1] = useState<string>(task?.link1 || "");
  const [link2, setLink2] = useState<string>(task?.link2 || "");
  const [link3, setLink3] = useState<string>(task?.link3 || "");
  const [websiteTitle, setWebsiteTitle] = useState<string>("");
  const [isImportant, setIsImportant] = useState<boolean>(task?.important || false);
  const [isCompleted, setIsCompleted] = useState<boolean>(task?.completed || false);
  const [selectedDirectory, setSelectedDirectory] = useState<string>(task?.dir || directories[0]);
  const [showExtraLinks, setShowExtraLinks] = useState<number>(0);
  const [timer, setTimer] = useState<number>(task?.timer || 1); // Timer dalam jam

  const isTitleValid = useRef<boolean>(false);
  const isDateValid = useRef<boolean>(false);

  useEffect(() => {
    const getDomainName = (url: string) => {
      try {
        const hostname = new URL(url).hostname;
        // Remove www. prefix if exists
        const domain = hostname.replace(/^www\./, '');
        // Replace dots with spaces
        return domain.split('.').slice(0, -1).join(' ');
      } catch (error) {
        console.error("Error extracting domain name:", error);
        return "Invalid URL";
      }
    };

    if (link) {
      setWebsiteTitle(getDomainName(link));
    }
  }, [link]);

  const addNewTaskHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0 || !task?.date;

    if (isTitleValid.current && isDateValid.current) {
      const newTask: Task = {
        title,
        dir: selectedDirectory,
        link,
        link1,
        link2,
        link3,
        date: date || undefined,
        completed: isCompleted,
        important: isImportant,
        id: task?.id || Date.now().toString(),
        timer: timer || undefined, // Menyertakan timer dalam jam
      };
      onConfirm(newTask);
      onClose();
    }
  };

  const handleAddLink = () => {
    if (showExtraLinks < 3) {
      setShowExtraLinks((prev) => prev + 1);
    }
  };

  const timerOptions = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <Modal onClose={onClose} title={nameForm}>
      <form className="flex flex-col stylesInputsField" onSubmit={addNewTaskHandler}>
        <label>
          Title
          <input
            type="text"
            placeholder="e.g., study for the test"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Date (optional)
          <input
            type="date"
            className="w-full"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            min={todayDate}
            max={maxDate}
          />
        </label>
        <label>
          Link
          <input
            type="text"
            placeholder="e.g., http://example.com"
            value={link}
            onChange={({ target }) => setLink(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Website Domain
          <input
            type="text"
            placeholder={websiteTitle || "Domain name"}
            value={websiteTitle}
            readOnly
            className="w-full"
          />
        </label>
        {showExtraLinks >= 1 && (
          <label>
            Link 1 (optional)
            <input
              type="text"
              placeholder="e.g., http://example.com"
              value={link1}
              onChange={({ target }) => setLink1(target.value)}
              className="w-full"
            />
          </label>
        )}
        {showExtraLinks >= 2 && (
          <label>
            Link 2 (optional)
            <input
              type="text"
              placeholder="e.g., http://example.com"
              value={link2}
              onChange={({ target }) => setLink2(target.value)}
              className="w-full"
            />
          </label>
        )}
        {showExtraLinks >= 3 && (
          <label>
            Link 3 (optional)
            <input
              type="text"
              placeholder="e.g., http://example.com"
              value={link3}
              onChange={({ target }) => setLink3(target.value)}
              className="w-full"
            />
          </label>
        )}
        {showExtraLinks < 3 && (
          <button
            type="button"
            className="btn mt-3"
            onClick={handleAddLink}
          >
            Add Extra Link
          </button>
        )}
        <label>
          Select a directory
          <select
            className="block w-full"
            value={selectedDirectory}
            onChange={({ target }) => setSelectedDirectory(target.value)}
          >
            {directories.map((dir: string) => (
              <option key={dir} value={dir} className="bg-slate-100 dark:bg-slate-800">
                {dir}
              </option>
            ))}
          </select>
        </label>
        <label>
          Timer (in hours)
          <select
            className="block w-full"
            value={timer}
            onChange={({ target }) => setTimer(parseInt(target.value) || 1)} // Menyertakan timer dalam jam
          >
            {timerOptions.map(i => (
              <option key={i} value={i}>
                {i} hour{ i > 1 ? 's' : '' }
              </option>
            ))}
          </select>
        </label>
        <InputCheckbox
          isChecked={isImportant}
          setChecked={setIsImportant}
          label="Mark as important"
        />
        <InputCheckbox
          isChecked={isCompleted}
          setChecked={setIsCompleted}
          label="Mark as completed"
        />
        <button type="submit" className="btn mt-5">
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
