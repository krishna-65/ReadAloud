import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SAMPLE_PARAGRAPH = "The quick brown fox jumps over the lazy dog. Programming is a valuable skill in the modern world.";

const Evaluator = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [report, setReport] = useState(null);
    const [startTime, setStartTime] = useState(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    const startSession = () => {
        setTranscript("");
        setReport(null);
        setStartTime(Date.now());
        setIsRecording(true);
        recognition.start();
    };

    const stopSession = () => {
        recognition.stop();
        setIsRecording(false);
    };

    recognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            finalTranscript += event.results[i][0].transcript;
        }
        setTranscript(finalTranscript);
        generateReport(finalTranscript, event.results[0][0].confidence);
    };

    const generateReport = (text, confidence) => {
        const duration = (Date.now() - startTime) / 1000;
        const refWords = SAMPLE_PARAGRAPH.toLowerCase().replace(/[.,]/g, "").split(" ");
        const userWords = text.toLowerCase().replace(/[.,]/g, "").split(" ");

        // Logic: Comparison
        let correctCount = 0;
        const wordFeedback = refWords.map((word, idx) => {
            const isCorrect = userWords.includes(word);
            if (isCorrect) correctCount++;
            return { word, status: isCorrect ? 'correct' : 'missed' };
        });

        // Scores
        const accuracy = ((correctCount / refWords.length) * 100).toFixed(0);
        const wpm = ((userWords.length / duration) * 60).toFixed(0);
        
        // Fluency metrics logic
        const hesitation = duration > refWords.length * 1.5 ? 60 : 95; 
        const expression = wpm > 100 && wpm < 150 ? 98 : 75;

        const newReport = {
            accuracy,
            wpm,
            hesitation,
            expression,
            pronunciation: (confidence * 100).toFixed(0),
            feedback: wordFeedback,
            rawText: text
        };

        setReport(newReport);
        axios.post('http://localhost:5000/api/report', newReport);
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <h1 style={{ color: '#2c3e50' }}>Fluency Evaluator</h1>
            
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3>Read this paragraph:</h3>
                <p style={{ fontSize: '20px', lineHeight: '1.6' }}>{SAMPLE_PARAGRAPH}</p>
            </div>

            <button 
                onClick={isRecording ? stopSession : startSession}
                style={{
                    padding: '15px 30px', fontSize: '18px', borderRadius: '30px', border: 'none',
                    backgroundColor: isRecording ? '#e74c3c' : '#2ecc71', color: 'white', cursor: 'pointer'
                }}
            >
                {isRecording ? "Stop & View Report" : "Start Reading Now"}
            </button>

            {report && (
                <div style={{ marginTop: '30px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
                    <h2>Your Fluency Report</h2>
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                        <StatBox label="Accuracy" val={report.accuracy + "%"} color="#27ae60" />
                        <StatBox label="Expression" val={report.expression + "%"} color="#2980b9" />
                        <StatBox label="Speech Rate" val={report.wpm + " WPM"} color="#8e44ad" />
                        <StatBox label="Confidence" val={report.pronunciation + "%"} color="#f39c12" />
                    </div>

                    <h3>Word Feedback:</h3>
                    <div style={{ fontSize: '18px' }}>
                        {report.feedback.map((item, i) => (
                            <span key={i} style={{ 
                                color: item.status === 'correct' ? '#27ae60' : '#e74c3c',
                                marginRight: '8px', fontWeight: item.status === 'correct' ? 'normal' : 'bold'
                            }}>
                                {item.word}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const StatBox = ({ label, val, color }) => (
    <div style={{ flex: 1, padding: '15px', background: color, color: 'white', borderRadius: '10px', textAlign: 'center' }}>
        <small>{label}</small>
        <div style={{ fontSize: '22px', fontWeight: 'bold' }}>{val}</div>
    </div>
);

export default Evaluator;