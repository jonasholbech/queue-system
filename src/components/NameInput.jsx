import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./NameInput.module.css";
export default function NameInput() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  function saveName(e) {
    e.preventDefault();
    localStorage.setItem("name", name);
    navigate("/");
  }
  if (localStorage.getItem("name") !== null) {
    return null;
  }
  return (
    <div className={styles.nameInput}>
      <h2>So, what can I call you?</h2>
      <form onSubmit={saveName}>
        <TextField
          id="outlined-basic"
          label="I just need to know what top call you"
          variant="outlined"
          style={{ margin: "0px 5px" }}
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={saveName}>
          Save
        </Button>
      </form>
    </div>
  );
}
