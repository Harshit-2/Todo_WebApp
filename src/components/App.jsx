import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Button, Alert, Snackbar } from '@mui/material';
import Header from './Header';
import TodoList from './TodoList';
import CreateTodoModal from './CreateTodoModal';
import TodoDetailsModal from './TodoDetailsModal';

function App() {
  const [todos, setTodos] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data.todos || response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      showNotification('Failed to fetch todos', 'error');
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post('/api/todos', newTodo);
      setTodos(prevTodos => [...prevTodos, response.data]);
      setIsCreateModalOpen(false);
      showNotification('Todo added successfully!', 'success');
    } catch (error) {
      console.error('Error creating todo:', error);
      showNotification('Failed to create todo', 'error');
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      // Use the appropriate ID field
      const todoId = updatedTodo._id || updatedTodo.id;
      const response = await axios.put(`/api/todos/${todoId}`, updatedTodo);
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          (todo._id === todoId || todo.id === todoId) ? response.data : todo
        )
      );
      setSelectedTodo(null);
      showNotification('Todo updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating todo:', error);
      showNotification('Failed to update todo', 'error');
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`/api/todos/${todoId}`);
      setTodos(prevTodos => prevTodos.filter(todo => (todo._id !== todoId && todo.id !== todoId)));
      showNotification('Todo deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting todo:', error);
      showNotification('Failed to delete todo', 'error');
    }
  };

  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="md">
      <Header />
      
      <Box sx={{ my: 2 }}>
        <Button  sx={{backgroundColor: "#f5ba13",
           "&:hover": { backgroundColor: "#e0a212" } 
        }}
          variant="contained" 
          color="primary" 
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create New Todo
        </Button>
      </Box>

      {todos.length > 0 ? (
        <TodoList 
          todos={todos} 
          onTodoClick={handleTodoClick} 
          onDeleteTodo={deleteTodo} 
        />
      ) : (
        <Box sx={{ my: 4, textAlign: 'center' }}>
          No todos yet. Create one to get started!
        </Box>
      )}

      <CreateTodoModal 
        open={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTodo={addTodo}
      />

      {selectedTodo && (
        <TodoDetailsModal 
          todo={selectedTodo}
          open={!!selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onUpdateTodo={updateTodo}
        />
      )}

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;