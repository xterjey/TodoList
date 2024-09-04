import React, { useRef, useState } from "react";
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
  const [url, setUrl] = useState<string>(task?.url || "");
  const [discord, setDiscord] = useState<string>(task?.discord || "");
  const [twitter, setTwitter] = useState<string>(task?.twitter || "");
  const [telegram, setTelegram] = useState<string>(task?.telegram || "");
  const [blockchain, setBlockchain] = useState<string>(task?.blockchain || "");
  const [wallet, setWallet] = useState<string>(task?.wallet || "");
  const [isImportant, setIsImportant] = useState<boolean>(task?.important || false);
  const [isCompleted, setIsCompleted] = useState<boolean>(task?.completed || false);
  const [selectedDirectory, setSelectedDirectory] = useState<string>(task?.dir || directories[0]);

  const isTitleValid = useRef<boolean>(false);
  const isDateValid = useRef<boolean>(false);

  const addNewTaskHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0 || !task?.date;

    if (isTitleValid.current && isDateValid.current) {
      const newTask: Task = {
        title,
        dir: selectedDirectory,
        url,
        date: date || undefined,
        completed: isCompleted,
        important: isImportant,
        id: task?.id || Date.now().toString(),
        discord: discord || undefined,
        twitter: twitter || undefined,
        telegram: telegram || undefined,
        blockchain: blockchain || undefined,
        wallet: wallet || undefined,
      };
      onConfirm(newTask);
      onClose();
    }
  };

  const walletOptions = [
    "MetaMask",
    "Trust Wallet",
    "OKX",
    "ArConnect",
    "Fact Wallet",
    "Keplr",
    "Kibisis",
    "Leap Cosmos",
    "Leather",
    "Leo Wallet",
    "Salmon",
    "Unisat",
    "Venom",
    "Zerion",
  ];

  return (
    <Modal onClose={onClose} title={nameForm}>
      <form className="flex flex-col stylesInputsField" onSubmit={addNewTaskHandler}>
        <label>
          Title
          <input
            type="text"
            placeholder="NAMA PROJECT"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Date
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
          URL
          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            className="w-full"
          />
        </label>
        <label>
         TELEGRAM / DISCROD
          <input
            type="text"
            placeholder="LINK"
            value={discord}
            onChange={({ target }) => setDiscord(target.value)}
            className="w-full"
          />
        </label>
        <label>
          BLOCKCHAIN
          <input
            type="text"
            placeholder="LINK"
            value={twitter}
            onChange={({ target }) => setTwitter(target.value)}
            className="w-full"
          />
        </label>
        <label>
         EVENT 
          <input
            type="text"
            placeholder="LINK"
            value={telegram}
            onChange={({ target }) => setTelegram(target.value)}
            className="w-full"
          />
        </label>
        <label>
        EVENT 2
          <input
            type="text"
            placeholder="LINK"
            value={blockchain}
            onChange={({ target }) => setBlockchain(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Wallet
          <select
            className="block w-full"
            value={wallet}
            onChange={({ target }) => setWallet(target.value)}
          >
            {walletOptions.map((wallet) => (
              <option key={wallet} value={wallet} className="bg-slate-100 dark:bg-slate-800">
                {wallet}
              </option>
            ))}
          </select>
        </label>
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
