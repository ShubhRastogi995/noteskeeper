import { Box } from "@mui/system";
import { Button, Paper, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotes } from "../action/notesActions";
import Errorhandler from "./Errorhandler";
import {useNavigate} from 'react-router-dom';


const AddNote = () => {

  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [content, setcontent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Note = useSelector((state) => state.notecreatereducer);
  const { error } = Note;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNotes(title, category, content));
    if(!title || !category || !content)
      return;
    navigate('/Mynotes')
  }

  return (
    <Box sx={{ marginTop: "4rem" }}>
      <Paper sx={{ textAlign: "center" }}>
        <Box>
          <h2>Enter All the fields to make a new note.</h2>
        </Box>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {error && <Errorhandler severity="error">{error}</Errorhandler>}
          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                sx={{ display: "flex", flexGrow: 1, margin: "0.5rem 1rem" }}
                label={"Title"}
                id="title"
                name="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                sx={{ display: "flex", flexGrow: 1, margin: "0.5rem 1rem" }}
                label={"Category"}
                id="category"
                name="category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            label={"Content"}
            sx={{ display: "flex", flexGrow: 1, margin: "0.5rem 1rem" }}
            multiline
            rows={10}
            id="content"
            name="content"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          />
          <Button
            sx={{ marginBottom: "1rem", marginTop: "0.5rem" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddNote;
