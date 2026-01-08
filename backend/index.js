
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/question", (req, res) => {
  res.json({
    id: "RA_A_1360",
    text: "Technology plays an important role in modern education by improving access to information and enhancing learning experiences."
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
