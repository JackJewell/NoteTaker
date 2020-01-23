const express = require("express");
const path = require("path");
const fs = require("fs");

let app = express();


let PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//GET notes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//GET db.json
app.get("/api/notes", function(req, res) {
    console.log("I am being called to return notes!");
    let rawData = fs.readFileSync('./db/db.json', (err) => {
        if (err) throw err;
        console.log("data read from file");
    });
    let notesVar = JSON.parse(rawData,null,2);
    console.log(notesVar);
    res.send(notesVar);
});

//GET all else, default to index
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



//POST api.notes
app.post("/api/notes", function(req, res) {
    console.log("I am being called to save notes!");
    console.log(req.body);
    
    

    let contentVar = fs.readFileSync('./db/db.json',function(err){
        if(err) throw err;
    });

    var parseJson = JSON.parse(contentVar);
    parseJson.push(req.body);
    console.log(parseJson);
    let data = JSON.stringify(parseJson,null,2);

    fs.writeFileSync('./db/db.json', data, (err) => {
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
