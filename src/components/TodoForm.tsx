import "./TodoForm.css";
import { useState } from "react";

// Import firebase configuration from firebase.ts file
import firebaseApp from "../firebase";
import { getDatabase, ref, push } from "firebase/database";

const TodoForm = () => {
    const db = getDatabase(firebaseApp);

    const [title, setTitle] = useState("");
    const [inputText, setInputText] = useState("");

    // Method that fires any time the input box changes
    // sets input value to the todo note title and saves to the inputText box
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setInputText(e.target.value);
    };

    // Method to add todo item to the todo list
    // Extend onClick functions here
    const addTodo = (event: any) => {
        event.preventDefault();
        const todoRef = ref(db, "/todos");
        const todo = {
            title,
            done: false,
        };
        push(todoRef, todo);
        setInputText("");
    };

    return (
        <form onSubmit={addTodo}>
            <input type="text" name="name" onChange={handleChange} placeholder="Enter todo item" value={inputText} />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default TodoForm;