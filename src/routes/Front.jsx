import { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { db } from "../firebase";
import { child, get, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
export default function Front() {
  const [input, setInput] = useState("");
  const [wrong, setWrong] = useState(false);
  let navigate = useNavigate();
  function removeAnimation() {
    setWrong(false);
  }
  function search(e) {
    e.preventDefault();
    const rr = ref(db, "rooms/");
    get(child(rr, input)) //`mmd-2nd-int`
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          navigate(`/room/${input}`);
        } else {
          console.log("No data available");
          setInput("");
          setWrong(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <Paper>
      <form
        onSubmit={search}
        className={wrong ? "shake" : ""}
        onAnimationEnd={removeAnimation}
      >
        <h2>What room are you looking for?</h2>
        <TextField
          id="outlined-basic"
          label="What are you looking for?"
          variant="outlined"
          style={{ margin: "0px 5px" }}
          size="small"
          value={input}
          required={true}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" type="submit" color="primary">
          Find
        </Button>
      </form>
    </Paper>
  );
}
