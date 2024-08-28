import React, { useState, useEffect } from "react";

interface Note {
  id: number;
  content: string;
  isEditing: boolean;
}

const Notepad: React.FC = () => {
  // Inisialisasi state dengan data dari localStorage jika ada
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [newNote, setNewNote] = useState<string>("");

  // Efek untuk menyimpan catatan ke localStorage setiap kali notes berubah
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNoteHandler = () => {
    if (newNote.trim()) {
      const newNoteEntry: Note = {
        id: Date.now(),
        content: newNote,
        isEditing: false,
      };
      setNotes((prevNotes) => [...prevNotes, newNoteEntry]);
      setNewNote("");
    }
  };

  const editNoteHandler = (id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isEditing: true } : note
      )
    );
  };

  const saveNoteHandler = (id: number, updatedContent: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content: updatedContent, isEditing: false } : note
      )
    );
  };

  const deleteNoteHandler = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(event.target.value);
  };

  return (
    <div className="mt-4">
              <table className="w-full mt-4 border-collapse border dark:border-slate-700">
        <thead>
          <tr>
            <th className="border p-2 dark:border-slate-700">No</th>
            <th className="border p-2 dark:border-slate-700">Note</th>
            <th className="border p-2 dark:border-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={note.id}>
              <td className="border p-2 text-center dark:border-slate-700">{index + 1}</td>
              <td className="border p-2 dark:border-slate-700">
                {note.isEditing ? (
                  <textarea
                    defaultValue={note.content}
                    onBlur={(e) => saveNoteHandler(note.id, e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-slate-200"
                    rows={2}
                  />
                ) : (
                  note.content
                )}
              </td>
              <td className="border p-2 text-center dark:border-slate-700">
                {note.isEditing ? (
                  <button
                    onClick={() => saveNoteHandler(note.id, note.content)}
                    className="mr-2 bg-green-500 text-white px-4 py-2 rounded-md transition hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => editNoteHandler(note.id)}
                    className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded-md transition hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteNoteHandler(note.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md transition hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-lg font-medium mb-2">Notepad</h3>

      {/* Form untuk menambahkan catatan baru */}
      <textarea
        value={newNote}
        onChange={handleNoteChange}
        placeholder="Tulis catatanmu di sini..."
        className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-slate-200"
        rows={3}
      />
      <button
        onClick={addNoteHandler}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md transition hover:bg-blue-600"
      >
        Add Note
      </button>

      {/* Tabel yang menampilkan catatan */}
    </div>
  );
};

export default Notepad;
