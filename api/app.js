const express = require("express");
const app = express();

app.post("/post", (req, res) => {
console.log("Connected to React");
res.redirect("/");
});

app.post('/draw', (req, res) => {
    // if (!req.body) return res.sendStatus(400);
    console.log("Received", req);
    res.send('Drawing Image')
    res.sendStatus(500)
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
