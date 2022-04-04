import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { db } from "../firebase";
import { child, get, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
export default function Front() {
  const [input, setInput] = useState("");
  let navigate = useNavigate();
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
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <form onSubmit={search}>
      <TextField
        id="outlined-basic"
        label="Hvad leder du efter?"
        variant="outlined"
        style={{ margin: "0px 5px" }}
        size="small"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button variant="contained" color="primary">
        Find
      </Button>
    </form>
  );
}
