import express from "express";
import cors from "cors";
const app = express()
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }));

app.get("/", (req, res) => {
    res.json({message: "Hello World"});
})

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    res.json({email, password});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})