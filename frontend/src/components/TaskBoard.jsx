import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

export default function TaskBoard({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTasks();
  };

  const moveTask = async (id, newStatus) => {
    await fetch(`/api/tasks/${id}/move`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = ["todo", "inprogress", "done"];
  const labels = {
    todo: "Da fare",
    inprogress: "In corso",
    done: "Completato",
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Nuovo task..."
          className="border rounded px-3 py-2 w-2/3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ Aggiungi
        </button>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => (
          <div
            key={col}
            className="bg-white p-4 rounded-2xl shadow-md min-h-[300px]"
          >
            <h3 className="font-bold text-lg mb-2 text-center text-blue-600">
              {labels[col]}
            </h3>
            {tasks
              .filter((t) => t.status === col)
              .map((t) => (
                <TaskCard key={t.id} task={t} moveTask={moveTask} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
