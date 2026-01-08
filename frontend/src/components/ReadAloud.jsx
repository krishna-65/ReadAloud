import React, { useState } from "react";

const ReadAloud = ({ question }) => {
  const [speaking, setSpeaking] = useState(false);

  const handleReadAloud = () => {
    if (!question) return;

    const utterance = new SpeechSynthesisUtterance(question);
    utterance.lang = "en-US";
    utterance.rate = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Read Aloud</h1>

        <p style={styles.question}>{question}</p>

        <button
          onClick={handleReadAloud}
          disabled={speaking}
          style={{
            ...styles.button,
            backgroundColor: speaking ? "#94a3b8" : "#2563eb",
          }}
        >
          {speaking ? "Reading..." : "Read Aloud"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fb, #eef2ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "14px",
    maxWidth: "720px",
    width: "100%",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "20px",
  },
  question: {
    fontSize: "17px",
    lineHeight: "1.7",
    color: "#374151",
  },
  button: {
    marginTop: "28px",
    padding: "14px 36px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default ReadAloud;
