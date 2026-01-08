Read Aloud Feature – MERN Stack
📌 Overview

This project implements a Read Aloud feature similar to modern educational platforms. A single question is displayed on the screen along with a Read Aloud button. When the button is clicked, the question is read aloud using the browser’s built-in Text-to-Speech (Speech Synthesis) API.
The UI is minimal, clean, responsive, and designed to match an educational platform’s look and feel.



⚙️ How the Read Aloud Feature Works

The backend (Node.js + Express) provides a single API endpoint that returns the question text.

The frontend (React) fetches the question and displays it on the screen.

When the user clicks the Read Aloud button:

The browser’s SpeechSynthesisUtterance API is triggered.

The question text is converted into speech.

The voice sounds natural and clear.

No page reload occurs.

While the text is being read, the button is disabled to avoid multiple triggers.

This implementation works smoothly on all modern browsers.





🛠 Tech Stack Used

Frontend: React

Backend: Node.js, Express

Text-to-Speech: Browser Speech Synthesis API

Styling: CSS (minimal, responsive UI)



🚀 How to Run the Project Locally
1️⃣ Clone the Repository
git clone <github-repo-url>
cd read-aloud-mern

2️⃣ Run Backend
cd backend
npm install
node index.js


Backend will start on:

http://localhost:5000

3️⃣ Run Frontend

Open a new terminal:

cd frontend
npm install
npm run dev


Frontend will open in the browser:

http://localhost:5173
