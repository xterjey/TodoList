import React, { useState } from "react";

interface PinEntryProps {
  onPinSubmit: (pin: string) => void;
}

const PinEntry: React.FC<PinEntryProps> = ({ onPinSubmit }) => {
  const [pin, setPin] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPinSubmit(pin);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-900 rounded shadow-lg">
        <h2 className="text-xl mb-4">Enter PIN</h2>
        <input
          type="password"
          value={pin}
          onChange={handleChange}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PinEntry;
