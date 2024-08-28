import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PinEntry from "./components/PinEntry";
import AccountData from "./components/AccountSection/AccountData";
import Footer from "./components/Footer";
import Menu from "./components/Menu/Menu";
import TasksSection from "./components/TasksSection/TasksSection";
import ModalCreateTask from "./components/Utilities/ModalTask";
import { Task } from "./interfaces";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { modalActions } from "./store/Modal.store";
import { tasksActions } from "./store/Tasks.store";

const App: React.FC = () => {
  const [pinEntered, setPinEntered] = useState(false);
  const modal = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const closeModalCreateTask = () => {
    dispatch(modalActions.closeModalCreateTask());
  };

  const createNewTaskHandler = (task: Task) => {
    dispatch(tasksActions.addNewTask(task));
  };

  const handlePinSubmit = (pin: string) => {
    if (pin === "1610") { // Ganti dengan PIN yang sesuai
      setPinEntered(true);
    } else {
      alert("Incorrect PIN");
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
      {pinEntered ? (
        <>
          {modal.modalCreateTaskOpen && (
            <ModalCreateTask
              onClose={closeModalCreateTask}
              nameForm="Add a task"
              onConfirm={createNewTaskHandler}
            />
          )}
          <Menu />
          <TasksSection />
          <Footer />
          <AccountData />
        </>
      ) : (
        <PinEntry onPinSubmit={handlePinSubmit} />
      )}
    </div>
  );
};

export default App;
