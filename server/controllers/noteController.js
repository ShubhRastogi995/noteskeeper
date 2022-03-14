const express = require('express');
const asyncHandler = require("express-async-handler");
const Note = require('../models/notesmodel');

const fetchNotes = asyncHandler( async (req, res) => {
    const notes = await Note.find({user: req.user._id});
    res.json(notes);
});

const createNote = asyncHandler( async(req, res) => {
    const {title, content, category} = req.body;
    if(!title || !content || !category)
        throw new Error("Please fill all the enteries");
    const note = new Note({ user: req.user._id, title: title, content: content, category: category});
    const creatednote = await note.save();
    res.json(creatednote);
});

const getNotebyid = asyncHandler( async(req, res) => {
    const note = await Note.findById(req.params.id);

    if(note)
        res.json(note)
    else 
        res.status(400).json({message: "Note not found."})
});

const updateNote = asyncHandler( async(req, res) => {
    const {title, content, category} = req.body;

    const note = await Note.findById(req.params.id);
    if(note.user.toString() !== req.user._id.toString()){
        res.status(401).json({message: "You can't perform this action."})
    }
    if(note){
        note.title = title;
        note.content = content;
        note.category = category

        const updatednote = await note.save();
        res.json(updatednote);
    } else {
        res.status(404).json({ message: "Note is not present." });
    }
});

const DeleteNote = asyncHandler( async(req, res) => {
    const note = await Note.findById(req.params.id);
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "You can't perform this action." });
    }
    if(note){
        await note.remove();
        res.json({message: "Note is deleted."});
    } else {
        res.status(404).json({ message: "Note is not present." });
    }
});

module.exports = {fetchNotes, createNote, getNotebyid, updateNote, DeleteNote};