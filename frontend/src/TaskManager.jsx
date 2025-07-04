import React from 'react'; // ✅ Required for JSX
import { useState, useEffect } from "react";
import { API } from "./Api";
import { Layout } from "./components/Layout";
import { Button } from "./components/Button";
import { Card } from "./components/Card";

export const TaskManager = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTask(res.data);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) return;
    const res = await API.post("/create", newTask);
    setTask([...task, res.data.task]);
    setNewTask({ title: "", description: "" });
  };

  const handleUpdateTask = async (id, updatedFields) => {
    await API.put(`/update/${id}`, updatedFields);
    setTask(task.map((t) => (t._id === id ? { ...t, ...updatedFields } : t)));
  };

  const handleDeleteTask = async (id) => {
    await API.delete(`/delete/${id}`);
    setTask(task.filter((t) => t._id !== id));
  };

  const inputStyle =
    "border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <Layout>
      <form
        onSubmit={handleCreateTask}
        className="mb-8 space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Create New Task
        </h2>
        <input
          className={inputStyle}
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          className={inputStyle}
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <Button type="submit">Create Task</Button>
      </form>

      {task.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No tasks available. Create one!</p>
      ) : (
        task.map((item) => (
          <Card key={item._id} className="transition-all duration-300 ease-in-out hover:shadow-lg">
            {editTaskId === item._id ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleUpdateTask(item._id, editTaskData);
                  setEditTaskId(null);
                }}
                className="space-y-3"
              >
                <input
                  className={inputStyle}
                  value={editTaskData.title}
                  onChange={(e) =>
                    setEditTaskData({ ...editTaskData, title: e.target.value })
                  }
                />
                <input
                  className={inputStyle}
                  value={editTaskData.description}
                  onChange={(e) =>
                    setEditTaskData({ ...editTaskData, description: e.target.value })
                  }
                />
                <div className="flex space-x-2">
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                  <Button variant="secondary" onClick={() => setEditTaskId(null)}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded mt-2 ${
                    item.complete
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.complete ? "Completed" : "Incomplete"}
                </span>
                <div className="space-x-2 mt-4">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setEditTaskId(item._id);
                      setEditTaskData({
                        title: item.title,
                        description: item.description,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteTask(item._id)}>
                    Delete
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleUpdateTask(item._id, { complete: !item.complete })
                    }
                  >
                    {item.complete ? "Unmark" : "Mark as Completed"}
                  </Button>
                </div>
              </>
            )}
          </Card>
        ))
      )}
    </Layout>
  );
};
