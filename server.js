require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ==================== HOME ====================

app.get("/", (req, res) => {
    res.json({
        message: "Task 3 Database API is running!"
    });
});

// ==================== USER APIs ====================

// Create User
app.post("/api/users", async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const user = await User.create({
            name,
            email
        });

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get All Users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get One User
app.get("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update User
app.put("/api/users/:id", async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Delete User
app.delete("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ==================== PROJECT APIs ====================

// Create Project
app.post("/api/projects", async (req, res) => {
    try {
        const { name, description, userId } = req.body;

        if (!name || !description || !userId) {
            return res.status(400).json({
                message: "Name, description and userId are required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const project = await Project.create({
            name,
            description,
            userId
        });

        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get All Projects
app.get("/api/projects", async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("userId", "name email");

        res.json(projects);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get One Project
app.get("/api/projects/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate("userId", "name email");

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json(project);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update Project
app.put("/api/projects/:id", async (req, res) => {
    try {
        const { name, description, userId } = req.body;

        if (!name || !description || !userId) {
            return res.status(400).json({
                message: "Name, description and userId are required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                userId
            },
            {
                new: true,
                runValidators: true
            }
        )
            .populate("userId", "name email");

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json(project);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Delete Project
app.delete("/api/projects/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ==================== TASK APIs ====================

// Create Task
app.post("/api/tasks", async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            projectId,
            userId
        } = req.body;

        if (!title || !description || !projectId || !userId) {
            return res.status(400).json({
                message:
                    "Title, description, projectId and userId are required"
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            projectId,
            userId
        });

        const populatedTask = await Task.findById(task._id)
            .populate("projectId", "name description")
            .populate("userId", "name email");

        res.status(201).json(populatedTask);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get All Tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("projectId", "name description")
            .populate("userId", "name email");

        res.json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get One Task
app.get("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("projectId", "name description")
            .populate("userId", "name email");

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update Task
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            projectId,
            userId
        } = req.body;

        if (!title || !description || !projectId || !userId) {
            return res.status(400).json({
                message:
                    "Title, description, projectId and userId are required"
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                status,
                projectId,
                userId
            },
            {
                new: true,
                runValidators: true
            }
        )
            .populate("projectId", "name description")
            .populate("userId", "name email");

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Delete Task
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ==================== MONGODB CONNECTION ====================

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(
                `Server running on http://localhost:${PORT}`
            );
        });
    })
    .catch((error) => {
        console.error(
            "MongoDB connection failed:",
            error.message
        );
    });