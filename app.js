const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();

// Replace with your actual API key

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const suffix =
  "Make the answer short and only related to constitution of india and add a hyperlink to any article related to it, dont use markdowns and bold, dont respond to questions not related to Law and democracy and say this is beyond my capabilities";

// app.use(express.static("./public/index.html"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/generate", async (req, res) => {
  const userInput = req.body.userInput;
  const query = ` ${userInput} ${suffix}`;

  try {
    const result = await model.generateContent(query);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
