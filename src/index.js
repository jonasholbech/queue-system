import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* import { ThemeProvider, createTheme } from "@mui/material/styles"; */
import "./index.css";
import Front from "./routes/Front";
import Room from "./routes/Room";
import NameInput from "./components/NameInput";

/* const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
 */
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ThemeProvider theme={theme}> */}
      <NameInput />
      <div id="container">
        <Routes>
          <Route path="/" element={<Front />} />
          <Route path="room/:roomid" element={<Room />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
      {/* </ThemeProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
