import TaskModel from "../model/TaskModel.js";


export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({message:"Title and description are required"});
        }
        const newTask = new TaskModel({ title, description });
        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask});
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message:"Internal server error"})
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);

    } catch (error) {
        console.log("Error fetching tasks:", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, complete } = req.body;

    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (complete !== undefined) updateFields.complete = complete;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            res.status(400).json({ message: "Task not foound"});
        } else {
            res.status(200).json({ message: "Task deleted successfully", task: deletedTask})
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal server error" })
    }
}