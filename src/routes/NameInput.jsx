import { useState, useRef, useEffect } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./NameInput.module.css";
export default function NameInput() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const field = useRef(null);
  function saveName(e) {
    e.preventDefault();
    localStorage.setItem("name", name);
    navigate("/");
  }
  useEffect(() => {
    field.current.focus();
  }, []);
  /* if (localStorage.getItem("name") !== null) {
    return null;
  } */
  return (
    <div className={styles.nameInput + " slide"}>
      <Paper>
        <h2>So, what can I call you?</h2>
        <form onSubmit={saveName}>
          <TextField
            id="outlined-basic"
            label="Your name"
            variant="outlined"
            style={{ margin: "0px 5px" }}
            size="small"
            inputRef={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={saveName}>
            Save
          </Button>
        </form>
      </Paper>
    </div>
  );
}
