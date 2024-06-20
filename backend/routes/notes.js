const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

// route:1 =>get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({error: error.message});
  }
});

// route:2 =>creating note
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 char").isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(400).send({error: error.message});
    }
  }
);

// route:3 =>update an existing note
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({note});
})

// route:4 delete note using Delete
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body;
   
    // find the note to be delete and delete it
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }

    // allow deletion only if user owns this note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }


    note=await Note.findByIdAndDelete(req.params.id);
    res.json({"succuss":"Note has been deleted",note:note});
})


module.exports = router;
