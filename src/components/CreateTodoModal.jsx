import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  Chip,
  Box
} from '@mui/material';

function CreateTodoModal({ open, onClose, onCreateTodo }) {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    tags: [],
    assignedUsers: []
  });

  const [tagInput, setTagInput] = useState('');
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (tagInput && !todo.tags.includes(tagInput)) {
      setTodo(prev => ({ 
        ...prev, 
        tags: [...prev.tags, tagInput] 
      }));
      setTagInput('');
    }
  };

  const handleAddUser = () => {
    if (userInput && !todo.assignedUsers.includes(userInput)) {
      setTodo(prev => ({ 
        ...prev, 
        assignedUsers: [...prev.assignedUsers, userInput] 
      }));
      setUserInput('');
    }
  };

  const handleSubmit = () => {
    onCreateTodo(todo);
    // Reset form
    setTodo({
      title: '',
      description: '',
      priority: 'Medium',
      tags: [],
      assignedUsers: []
    });
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#f5ba13", color: "#fff" }}>
        Create New Todo
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Todo Title"
          fullWidth
          variant="outlined"
          value={todo.title}
          onChange={handleChange}
          required
          sx={{
            "& label.Mui-focused": { color: "#f5ba13" },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "#f5ba13" },
            },
          }}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          multiline
          rows={3}
          fullWidth
          variant="outlined"
          value={todo.description}
          onChange={handleChange}
          sx={{
            "& label.Mui-focused": { color: "#f5ba13" },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "#f5ba13" },
            },
          }}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel 
            sx={{ color: "#f5ba13", "&.Mui-focused": { color: "#f5ba13" } }}
          >
            Priority
          </InputLabel>
          <Select
            name="priority"
            value={todo.priority}
            label="Priority"
            onChange={handleChange}
            sx={{
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f5ba13" },
            }}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <TextField
            label="Add Tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            sx={{
              "& label.Mui-focused": { color: "#f5ba13" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#f5ba13" },
              },
            }}
          />
          <Button sx={{ color: "#f5ba13", "&:hover": { backgroundColor: "#ffffe6" } }} onClick={handleAddTag}>
            Add Tag
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          {todo.tags.map(tag => (
            <Chip 
              key={tag} 
              label={tag} 
              onDelete={() => setTodo(prev => ({
                ...prev, 
                tags: prev.tags.filter(t => t !== tag)
              }))} 
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <TextField
            label="Mention Users"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddUser()}
            sx={{
              "& label.Mui-focused": { color: "#f5ba13" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#f5ba13" },
              },
            }}
          />
          <Button sx={{ color: "#f5ba13", "&:hover": { backgroundColor: "#ffffe6" } }} onClick={handleAddUser}>
            Mention User
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          {todo.assignedUsers.map(user => (
            <Chip 
              key={user} 
              label={`@${user}`} 
              onDelete={() => setTodo(prev => ({
                ...prev, 
                assignedUsers: prev.assignedUsers.filter(u => u !== user)
              }))} 
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#f5ba13", "&:hover": { backgroundColor: "#ffffe6" } }}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          sx={{ backgroundColor: "#f5ba13", "&:hover": { backgroundColor: "#e0a212" } }}
          disabled={!todo.title}
        >
          Create Todo
        </Button>
      </DialogActions>
    </Dialog>
);

}

export default CreateTodoModal;
