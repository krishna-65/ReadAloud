import React, { useEffect, useState } from "react";
import ReadAloud from "./components/ReadAloud";

function App() {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/question")
      .then((res) => res.json())
      .then((data) => setQuestion(data.text));
  }, []);

  return <ReadAloud question={question} />;
}

export default App;
