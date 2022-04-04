import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Front from "./routes/Front";
import Room from "./routes/Room";
import NameInput from "./components/NameInput";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
