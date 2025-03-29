import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Todo Schema
const TodoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Medium' 
  },
  tags: [{ 
    type: String 
  }],
  assignedUsers: [{ 
    type: String 
  }],
  notes: [{
    text: String,
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

// Routes
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/todos', async (req, res) => {
  try {
    const { 
      tags, 
      priority, 
      assignedUser, 
      sortBy = 'createdAt', 
      page = 1, 
      limit = 10 
    } = req.query;

    const filter = {};
    if (tags) filter.tags = { $in: tags.split(',') };
    if (priority) filter.priority = priority;
    if (assignedUser) filter.assignedUsers = assignedUser;

    const sort = {};
    if (sortBy === 'priority') {
      sort.priority = -1;
    } else {
      sort.createdAt = -1;
    }

    const options = {
      sort,
      limit: parseInt(limit),
      skip: (page - 1) * limit
    };

    const todos = await Todo.find(filter, null, options);
    const total = await Todo.countDocuments(filter);

    res.json({
      todos,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id, 
      { 
        ...req.body, 
        updatedAt: new Date() 
      }, 
      { new: true }
    );
    
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/todos/:id/notes', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    todo.notes.push({
      text: req.body.text,
      createdAt: new Date()
    });
    
    const updatedTodo = await todo.save();
    res.status(201).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
