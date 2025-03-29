import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button, 
  Typography, 
  Box,
  Chip
} from '@mui/material';

function TodoDetailsModal({ 
  todo, 
  open, 
  onClose, 
  onUpdateTodo
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateTodo(editedTodo);
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#f5ba13", color: "#fff" }}>
        {isEditing ? 'Edit Todo' : 'Todo Details'}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {!isEditing && (
            <Button sx={{ color: "#fff", "&:hover": { backgroundColor: "#e0a212" } }} onClick={() => setIsEditing(true)}>
              Edit Todo
            </Button>
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        {isEditing ? (
          <>
            <TextField
              name="title"
              label="Title"
              fullWidth
              margin="dense"
              value={editedTodo.title}
              onChange={handleChange}
              sx={{
                "& label.Mui-focused": { color: "#f5ba13" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#f5ba13" },
                },
              }}
            />
            <TextField
              name="description"
              label="Description"
              multiline
              rows={3}
              fullWidth
              margin="dense"
              value={editedTodo.description}
              onChange={handleChange}
              sx={{
                "& label.Mui-focused": { color: "#f5ba13" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#f5ba13" },
                },
              }}
            />
          </>
        ) : (
          <>
            <Typography variant="h6">{todo.title}</Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
              {todo.description}
            </Typography>
          </>
        )}

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip 
            label={todo.priority} 
            color={
              todo.priority === 'High' ? 'error' : 
              todo.priority === 'Medium' ? 'warning' : 'success'
            } 
          />
          {todo.tags?.map(tag => (
            <Chip key={tag} label={tag} variant="outlined" />
          ))}
          {todo.assignedUsers?.map(user => (
            <Chip 
              key={user} 
              label={`@${user}`} 
              color="primary" 
              variant="outlined" 
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        {isEditing ? (
          <>
            <Button sx={{ color: "#f5ba13", "&:hover": { backgroundColor: "#ffffe6" } }} onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button 
              sx={{ backgroundColor: "#f5ba13", "&:hover": { backgroundColor: "#e0a212" } }}
              variant="contained" 
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <Button sx={{ color: "#f5ba13", "&:hover": { backgroundColor: "#ffffe6" } }} onClick={onClose}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default TodoDetailsModal;
