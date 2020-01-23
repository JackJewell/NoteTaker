const express = require("express");
const path = require("path");
const fs = require("fs");

var app = express();


var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//GET notes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//GET all else, default to index
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//GET db.json
app.get("/api/notes", function(req, res) {
    res.sendFile("../db/db.json");
});



//POST api.notes
app.post("/api/notes", function(req, res) {
    console.log("I am being called!");
    console.log(req.body);
    
    let data = JSON.stringify(req.body,null,2)

    fs.writeFile('./db/db.json', data, {'flag':'a'}, (err) => {
        if (err) throw err;
        console.log("data written to file");
    });
});

//DELETE api.notes
app.delete("/api/notes/:id", function(req, res){

});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
