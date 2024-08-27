import React, {useEffect, useState} from 'react';
import Button from './Button';
import Input from './Input';
import DraggableIcon from "./DraggableIcon";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

interface TodoItemProps {
    id: number;
    description: string;
    isComplete: boolean;
    createdAt: string;
    updatedAt: string | null;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, newDescription: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
                                               id,
                                               description,
                                               isComplete,
                                               createdAt,
                                               updatedAt,
                                               onToggleComplete,
                                               onDelete,
                                               onUpdate
                                           }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(id, editedDescription);
        setIsEditing(false);
    };

    useEffect(() => {
        if (isEditing) {
            // Set focus to the input field when editing starts
            const inputField = document.querySelector(`#edit-input-${id}`) as HTMLInputElement;
            if (inputField) {
                inputField.focus();
            }
        }
    }, [isEditing]);

    return (
        <div className={`todo-item bg-gray-700 p-3 rounded mb-2 flex items-center justify-between ${isEditing ? 'border border-blue-500' : ''}`}>
            <div className="flex items-center flex-grow">
                <DraggableIcon />
                <div className="flex mr-4" onClick={(e) => e.preventDefault()}>
                    {isEditing ? (
                        <form className="flex items-center">
                            {/*Edit existing todoitems*/}
                            <Input
                                type="text"
                                id={`edit-input-${id}`}
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                required
                                className="flex-grow mr-2"
                            />
                            <Button type="submit" onClick={handleSubmit} className="mr-2">Save</Button>
                            <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </form>
                    ) : (
                        <div className={""}>
                            <p className={`text-lg cursor-default ${isComplete ? 'line-through text-gray-500' : 'text-white'}`}>{description}</p>
                            <p className="text-xs text-gray-400 cursor-default">
                                Created: {new Date(createdAt).toLocaleString()}
                                {updatedAt && ` | Updated: ${new Date(updatedAt).toLocaleString()}`}
                            </p>
                        </div>
                    )}
                </div>
                {/* Add div between text and buttons to have additional drag zone*/}
                <div className={"flex-grow h-11 mr-4 drag-handle cursor-grab"}></div>
            </div>
            {!isEditing && (
                <div className="flex items-center flex-shrink-0 " onClick={(e) => e.preventDefault()}>
                    <Button onClick={() => onToggleComplete(id)} variant="secondary" className="mr-2 text-sm py-1 px-2">
                        {isComplete ? 'Undo' : 'Complete'}
                    </Button>
                    <Button onClick={() => setIsEditing(true)} variant="primary" className="mr-2 text-sm py-1 px-2">
                        Edit
                    </Button>
                    <Button onClick={() => onDelete(id)} variant="danger" className="text-sm py-1 px-2">
                        Delete
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TodoItem;