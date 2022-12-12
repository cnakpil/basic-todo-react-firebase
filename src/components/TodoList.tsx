// Import components and css
import Checkbox from "./Checkbox";
import "./TodoList.css";

// Import React methods
import { useEffect, useState } from "react";

// Import firebase configuration from firebase.ts file
import firebaseApp from "../firebase";

// Import firebase realtime database methods
import { getDatabase, ref, onValue, update, set } from "firebase/database";

// Import Todo type from types.ts
import { Todo } from "../types";

const TodoList = () => {
    // Open database connection
    const db = getDatabase(firebaseApp);

    // Track state of the todoList array items, reset before repopulating with database data
    const [todoList, setTodoList] = useState<Todo[]>([]);

    // React useEffect method, runs all functions within after page rendered
    useEffect(() => {
        const todoRef = ref(db, "/todos");

        // firebase onValue method, watches for changes on the database and updates the todoRef array
        onValue(todoRef, (snapshot) => {
            const todos = snapshot.val();
            const newTodoList: Todo[] = [];

            for (let id in todos) {
                newTodoList.push({ id, ...todos[id] });
            }

            setTodoList(newTodoList);
        });
    }, [db]);

    // Changes todo completion state, updates to firebase
    const changeTodoCompletion = (todo: Todo) => {
        const todoRef = ref(db, "/todos/" + todo.id);
        console.log(todoRef);
        update(todoRef, { done: !todo.done });
        console.log("done: " + !todo.done);
    };

    // Deletes specified todo, updates to firebase
    const deleteTodo = (todo: Todo) => {
        const todoRef = ref(db, "/todos/" + todo.id);
        set(todoRef, null);
    }

    // Returns todoList component
    return (
        <div className="list-wrapper">
            {todoList.map((todo, index) => {
                return (
                    <Checkbox
                        key={index}
                        checked={todo.done}
                        label={todo.title}
                        handleChange={() => changeTodoCompletion(todo)}
                        handleClick={() => deleteTodo(todo)}
                    />
                );
            })}
        </div>
    );
};

export default TodoList;