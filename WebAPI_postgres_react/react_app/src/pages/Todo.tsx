import React, { useState, useEffect, useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import TodoItem from '../components/TodoItem';
import { Sortable } from '@shopify/draggable';

interface TodoItemType {
    id: number;
    description: string;
    isComplete: boolean;
    createdAt: string;
    updatedAt: string;
}

const Todo: React.FC = () => {
    const [todos, setTodos] = useState<TodoItemType[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const todoListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        if (todoListRef.current) {
            const sortable = new Sortable(todoListRef.current, {
                draggable: '.todo-item',
                handle: '.drag-handle' // You'll need to add this class to a part of your TodoItem
            });

            sortable.on('sortable:stop', (event) => {
                const { oldIndex, newIndex } = event;
                const newTodos = Array.from(todos);
                const [reorderedItem] = newTodos.splice(oldIndex, 1);
                newTodos.splice(newIndex, 0, reorderedItem);
                setTodos(newTodos);
                // Here you should also update the order on the server
                updateTodoOrder(newTodos);
            });

            return () => {
                sortable.destroy();
            };
        }
    }, [todos]);

    const fetchTodos = async () => {
        const response = await fetch('/api/todoitems');
        const data = await response.json();
        setTodos(data);
    };

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        const response = await fetch('/api/todoitems', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: newTodo, isComplete: false }),
        });

        if (response.ok) {
            setNewTodo('');
            document.getElementById('todo-input')?.focus();
            fetchTodos();
        }
    };

    const handleToggleComplete = async (id: number) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;

        const response = await fetch(`/api/todoitems/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todo, isComplete: !todo.isComplete }),
        });

        if (response.ok) {
            fetchTodos();
        }
    };

    const handleDelete = async (id: number) => {
        const response = await fetch(`/api/todoitems/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchTodos();
        }
    };

    const handleUpdate = async (id: number, newDescription: string) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;

        const response = await fetch(`/api/todoitems/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todo, description: newDescription }),
        });

        if (response.ok) {
            fetchTodos();
        }
    };

    const updateTodoOrder = async (newTodos: TodoItemType[]) => {
        // Implement this function to update the order on the server
        // You might need to add a new API endpoint for this
        console.log('New order:', newTodos);
    };

    return (
        <div className="mx-auto">
            <h1 className="text-2xl font-bold text-white mb-4">Todo List</h1>

            <form onSubmit={handleAddTodo} className="mb-4">
                <div className="flex gap-5">
                    <div className="flex-grow">
                        <Input
                            type="text"
                            value={newTodo}
                            id="todo-input"
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Enter a new todo item"
                            required
                            className="w-full h-full"
                        />
                    </div>
                    <Button type="submit" className="whitespace-nowrap">
                        Add Todo
                    </Button>
                </div>
            </form>

            <div ref={todoListRef}>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        {...todo}
                        onToggleComplete={handleToggleComplete}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;