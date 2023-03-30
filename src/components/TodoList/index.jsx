import React, { useState, useEffect } from "react";

import axios from "axios";

import TodoItem from "../../components/TodoItem";

import "./TodoList.scss";
import Loading from "../Loading";

const TodoList = (props) => {
    const { list } = props;
    const [todos, setTodos] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const [isEditingList, setIsEditingList] = useState(false);
    const [editNameList, setEditNameList] = useState(list.name);
    const [loading, setLoading] = useState(false);

    const handleOnChangeNameList = (e) => {
        setEditNameList(e.target.value);
    };
    const handleShowForm = () => {
        setIsAdding(!isAdding);
    };
    const handleOnChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle list
    const handleEditList = () => {
        setIsEditingList(!isEditingList);
        if (!isEditingList) return;
        props.handleEditList({ _id: list._id, name: editNameList });
    };
    const handleDeleteList = () => {
        props.handleDeleteList(list._id);
    };

    useEffect(() => {
        const getTodos = async () => {
            let response = await axios.get(
                `https://trello-backend-three.vercel.app/api/todo_lists/${list._id}`
            );
            setTodos(response.data.data);
        };
        getTodos();
    }, []);

    // Handle todo
    const handleAddTodo = () => {
        if (!inputValue) {
            setIsAdding(false);
            return;
        }
        const addTodo = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    "https://trello-backend-three.vercel.app/api/todos/create",
                    { listId: list._id, nameTodo: inputValue }
                );
                const newTodo = response.data;
                const newTodos = [...todos, newTodo];

                setInputValue("");
                setIsAdding(false);
                setTodos(newTodos);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        addTodo();
    };

    const handleEditTodo = (data) => {
        const editTodo = async () => {
            try {
                const response = await axios.put(
                    `https://trello-backend-three.vercel.app/api/todos/${data._id}`,
                    data
                );
                const updatedTodo = response.data;
                const newTodos = todos.map((todo) => {
                    if (todo._id === updatedTodo._id) {
                        return { ...todo, name: updatedTodo.name };
                    }
                    return todo;
                });
                setTodos(newTodos);
            } catch (error) {
                console.log(error);
            }
        };
        editTodo();
    };

    const handleDeleteTodo = (id) => {
        const deleteTodo = async () => {
            try {
                await axios.delete(`https://trello-backend-three.vercel.app/api/todos/${id}`, {
                    params: { listId: list._id },
                });
                const todo = document.getElementById(id);
                todo.remove();
            } catch (error) {
                console.log(error);
            }
        };
        deleteTodo();
    };

    return (
        <div id={list._id} className='todolist_container'>
            <div className='header'>
                {isEditingList ? (
                    <input
                        className='edit_input'
                        type='text'
                        value={editNameList}
                        onChange={handleOnChangeNameList}
                    />
                ) : (
                    <div className='header_name'>{list.name}</div>
                )}
                <div className='actions'>
                    <div className='edit_btn' onClick={handleEditList}>
                        {isEditingList ? (
                            <i className='bx bx-check' />
                        ) : (
                            <i className='bx bx-pencil'></i>
                        )}
                    </div>
                    <div className='delete_btn'>
                        <i className='bx bx-x' onClick={handleDeleteList}></i>
                    </div>
                </div>
            </div>
            <div className='content'>
                {todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        id={todo._id}
                        item={todo}
                        handleEditTodo={handleEditTodo}
                        handleDeleteTodo={handleDeleteTodo}
                    />
                ))}
            </div>
            <div className='additem_container'>
                {isAdding ? (
                    <div className='additem_form'>
                        <input
                            className='additem_form_input'
                            type='text'
                            value={inputValue}
                            onChange={handleOnChange}
                            placeholder={`Enter the title for this card...`}
                        />
                        <div className='additem_form_actions'>
                            <button className='add' onClick={handleAddTodo}>
                                {loading ? <Loading /> : "Add card"}
                            </button>
                            <button className='cancel' onClick={handleShowForm}>
                                <i className='bx bx-x'></i>
                            </button>
                        </div>
                    </div>
                ) : (
                    <button className='additem_btn' onClick={handleShowForm}>
                        <i className='bx bx-plus'></i>
                        Add a card
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoList;
