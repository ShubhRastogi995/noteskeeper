import { Box } from "@mui/system";
import { Button, Paper, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Errorhandler from "./Errorhandler";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { editNote } from "../action/notesActions";

const EditNote = () => {
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [content, setcontent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
 
  const editnote = useSelector((state) => state.noteeditreducer);
  const {error} = editnote;

  const fetching = useCallback(async () => {
    const {data} = await axios.get(`/api/notes/${id}`);

    settitle(data.title);
    setcategory(data.category);
    setcontent(data.content);
  }, [id]);

  useEffect(() => {
    fetching()
  }, [fetching])

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editNote(id, title, category, content));
    if (!title || !category || !content) return;
    navigate("/Mynotes");
  }

  return (
    <Box sx={{ marginTop: "4rem" }}>
      <Paper sx={{ textAlign: "center" }}>
        <Box>
          <h2>You can edit your note here.</h2>
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

export default EditNote;
