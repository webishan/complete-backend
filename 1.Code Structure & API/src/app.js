// Create the server -> app.js

const express = require('express');

const app = express();

// Use middleware to parse JSON request bodies
app.use(express.json());


const notes = [];


// POST /notes -> Create a new note
app.post('/notes',(req,res) => {
    notes.push(req.body)

    res.status(201).json({
        message: "Note created successfully"
    })
})

// GET /notes -> Get all notes
app.get('/notes',(req,res)=>{
    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    })

})


// DELETE /notes/:index -> Delete a note by id
app.delete('/notes/:index',(req, res)=>{

    // Get the index from the request parameters
    const index = req.params.index

    // delete the note at the specified index
    delete notes[index]

    res.status(200).json({
        message: "Note deleted successfully"
    })
})



app.patch('/notes/:index',(req,res)=>{
    // Get the index from the request parameters
    const index = req.params.index


    const description = req.body.description

    // Update the note at the specified index
    notes[index].description = description

    res.status(200).json({
        message: "Note updated successfully"
    })
})

module.exports = app;