export default function TaskCard({ task, moveTask }) {
  const nextStatus = {
    todo: "inprogress",
    inprogress: "done",
    done: "todo",
  };

  return (
    <div className="border rounded p-3 mb-2 shadow-sm bg-gray-50 flex justify-between items-center">
      <div>
        <h4 className="font-semibold">{task.title}</h4>
      </div>
      <button
        className="text-blue-500 hover:text-blue-700 text-sm"
        onClick={() => moveTask(task.id, nextStatus[task.status])}
      >
        ⏩
      </button>
    </div>
  );
}