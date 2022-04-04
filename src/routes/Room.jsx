import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase.js";
import {
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";

import AskQuestion from "../components/AskQuestion";
import Question from "../components/Question";
function Room() {
  const [questions, setQuestions] = useState([]);
  const firstRender = useRef(true);
  let params = useParams();
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const questionRef = ref(db, `rooms/${params.roomid}/questions`);
      onChildAdded(questionRef, (data) => {
        console.log(data, "added");
        setQuestions((old) => old.concat({ ...data.val(), id: data.key }));
      });

      onChildChanged(questionRef, (data) => {
        console.log(data, "child changed");
        setQuestions((old) => {
          return old.map((el) => {
            if (el.id === data.key) {
              return { ...data.val(), id: data.key };
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
  }, [params.roomid]);

  return (
    <>
      <h2>MMD Queue - {params.roomid}</h2>
      <AskQuestion roomid={params.roomid} />

      {questions.map((q) => (
        <Question key={q.id} {...q} />
      ))}
    </>
  );
}

export default Room;
