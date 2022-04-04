import { Card, Avatar, Paper, Button } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ref, update, remove } from "firebase/database";
import { db } from "../firebase";
import styles from "./Question.module.css";
import { stringToColor, getAvatarLetters } from "../utils/strings";
import { canDelete } from "../utils/auth";
export default function Question(props) {
  function toggleStatus() {
    update(ref(db, "rooms/mmd-2nd-int/questions/" + props.id), {
      status: props.status === "Waiting" ? "Getting Help" : "Waiting",
    });
  }
  function deleteQuestion() {
    remove(ref(db, "rooms/mmd-2nd-int/questions/" + props.id));
  }
  return (
    <article className={styles.question}>
      <Paper>
        <header className={styles.header}>
          <Avatar sx={{ bgcolor: stringToColor(props.author) }}>
            {getAvatarLetters(props.author)}
          </Avatar>
          <p>{props.author}</p>
          <p className={styles.timeAgo}>
            <span>{formatDistanceToNow(props.added)} ago</span>
          </p>
        </header>
        <section>
          <details>
            <summary>{props.question}</summary>
            <p>{props.description}</p>
          </details>
        </section>
        <footer>
          <Button
            variant="contained"
            disabled={!canDelete(props.author)}
            color="success"
            onClick={toggleStatus}
          >
            {props.status}
          </Button>
          {canDelete(props.author) && (
            <Button variant="contained" color="error" onClick={deleteQuestion}>
              Delete
            </Button>
          )}
        </footer>
      </Paper>
    </article>
  );
}
