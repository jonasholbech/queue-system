import { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@mui/material";
import { db } from "./firebase.js";
import {
  ref,
  set,
  push,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";
import "./App.css";

//const q = query(collection(db, "mmd-2nd-int"), orderBy("timestamp", "desc"));

function App() {
  const [questions, setQuestions] = useState([]);
  const [input, setInput] = useState("");
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const questionRef = ref(db, "rooms/mmd-2nd-int/questions");
      onChildAdded(questionRef, (data) => {
        console.log(data, "added");
        setQuestions((old) => old.concat({ ...data.val(), id: data.key }));
      });

      onChildChanged(questionRef, (data) => {
        setQuestions((old) => {
          return old.map((el) => {
            if (el.id === data.key) {
              return data;
            }
            return el;
          });
        });
      });

      onChildRemoved(questionRef, (data) => {
        setQuestions((old) => {
          return old.filter((item) => item.id !== data.key);
        });
      });
    }
  }, []);
  const addTodo = (e) => {
    e.preventDefault();
    const questionRef = ref(db, "rooms/mmd-2nd-int/questions");
    const newPostRef = push(questionRef);
    set(newPostRef, {
      author: "someone",
      description: "more lorem",
    });
  };

  return (
    <div className="App">
      <h2> TODO List App</h2>
      <form>
        <TextField
          id="outlined-basic"
          label="Make Todo"
          variant="outlined"
          style={{ margin: "0px 5px" }}
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add Todo
        </Button>
      </form>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            {q.author} {q.description}
          </li>
        ))}
        {/* {todos.map((item) => (
          <Todo key={item.id} arr={item} />
        ))} */}
      </ul>
    </div>
  );
}

export default App;
