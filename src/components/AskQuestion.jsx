import { TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import { db } from "../firebase";
import { ref, set, push } from "firebase/database";
import styles from "./AskQuestion.module.css";
export default function AskQuestion(props) {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const addQuestion = (e) => {
    e.preventDefault();
    const questionRef = ref(db, `rooms/${props.roomid}/questions`);
    const newPostRef = push(questionRef);
    //newPostRef.key burde indeholde det genererede id
    set(newPostRef, {
      author: localStorage.getItem("name"),
      question,
      description,
      status: "waiting",
      added: Date.now(),
    })
      .then((e) => {
        // Data saved successfully!
        console.log(e);
      })
      .catch((error) => {
        // The write failed...
      });
    setQuestion("");
    setDescription("");
  };
  return (
    <Paper>
      <form
        className={styles.AskQuestion}
        style={{ padding: "1rem" }}
        onSubmit={addQuestion}
      >
        <TextField
          id="outlined-basic"
          label="Question"
          variant="outlined"
          size="small"
          required={true}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          size="small"
          minRows={2}
          multiline={true}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button variant="contained" color="primary" type="submit">
          Add Todo
        </Button>
      </form>
    </Paper>
  );
}
