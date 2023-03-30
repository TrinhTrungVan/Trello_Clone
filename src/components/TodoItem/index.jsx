import React, { useState } from "react";

import "./TodoItem.scss";

const TodoItem = (props) => {
    const item = props.item;

    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(item.name);

    const handleOnChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleDeleteTodo = () => {
        props.handleDeleteTodo(item._id);
    };

    const handleEditTodo = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            props.handleEditTodo({ _id: item._id, name: editValue });
        }
    };

    return (
        <div id={item._id} className='todoitem_container'>
            {isEditing ? <input className='edit_input' type='text' value={editValue} onChange={handleOnChange} /> : <div className='name'>{item.name}</div>}
            <div className='actions'>
                <div className='edit_btn' onClick={handleEditTodo}>
                    {isEditing ? <i className='bx bx-check'></i> : <i className='bx bx-pencil'></i>}
                </div>
                <div className='delete_btn'>
                    <i className='bx bx-x' onClick={handleDeleteTodo}></i>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
