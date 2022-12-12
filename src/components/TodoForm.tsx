import "./TodoForm.css";
import { useState } from "react";

// Import firebase configuration from firebase.ts file
import firebaseApp from "../firebase";

// Import firebase realtime database methods
import { getDatabase, ref, push } from "firebase/database";

const TodoForm = () => {
    // Open connection to the database
    const db = getDatabase(firebaseApp);

    // Track states of actively changing variables
    const [title, setTitle] = useState("");
    const [inputText, setInputText] = useState("");

    // Method that fires any time the input box changes
    // Sets input value to the todo note title and saves to the inputText box
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setInputText(e.target.value);
    };

    // Method to add todo item to the todo list and reset the state of inputText
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


    // Return todo form component
    return (
        <form onSubmit={addTodo}>
            <input type="text" name="name" onChange={handleChange} placeholder="Enter todo item" value={inputText} />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default TodoForm;