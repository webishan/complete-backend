const express = require('express');
const noteModel = require('./models/note.model.js')

const app = express();
app.use(express.json()) // to parse the body of the request into JSON format

/* 

POST /notes => create a note in DB
GET /notes => get all notes from DB
DELETE /notes/:id => delete a note from DB
PATCH /notes/:id => update a note in DB 

*/

app.post("/notes", async (req, res) => {
    
    const data = req.body  // {title: "some title", description: "some description"}

    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message: "Note created successfully"
    })

    })


app.get("/notes", async (req, res) => {
    const notes =await noteModel.find()  // find returns an array of all the notes in the DB

    // const notes = await noteModel.findOne({  // findOne returns the first note that matches the query
    //     title: "test_title"
    // })
    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    })
})


app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({_id: id}, {description: description})

    res.status(200).json({
        message: "Note updated successfully"
    })
})

// note = {title, description}

module.exports = app;