import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  IconButton, 
  Box 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TodoList({ todos, onTodoClick, onDeleteTodo }) {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  // Function to safely handle todo deletion
  const handleDelete = (e, todo) => {
    e.stopPropagation(); // Prevent the click from triggering the todo click event
    const todoId = todo._id || todo.id;
    onDeleteTodo(todoId);
  };

  return (
    <List>
      {todos.map((todo) => (
        <ListItem 
          key={todo._id || todo.id} 
          divider
          secondaryAction={
            <Box>
              <IconButton 
                edge="end" 
                onClick={(e) => {
                  e.stopPropagation();
                  onTodoClick(todo);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                edge="end" 
                onClick={(e) => handleDelete(e, todo)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          }
          sx={{ cursor: 'pointer' }}
          onClick={() => onTodoClick(todo)}
        >
          <ListItemText 
            primary={todo.title}
            secondary={
              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                {todo.priority && (
                  <Chip 
                    label={todo.priority} 
                    color={getPriorityColor(todo.priority)} 
                    size="small" 
                  />
                )}
                {todo.tags?.map(tag => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    size="small" 
                    variant="outlined" 
                  />
                ))}
                {todo.assignedUsers?.map(user => (
                  <Chip 
                    key={user} 
                    label={`@${user}`} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                ))}
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default TodoList;