import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "./Mynotes.css";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, listNotes } from "../action/notesActions";
import Errorhandler from "./Errorhandler";

const useStyle = makeStyles((theme) => ({
  container: {
    padding: "2rem 5vw",
  },
  btn: {
    position: "fixed",
  },
  edit: {
    color: "#1976d2",
  },
  delete: {
    color: red[500],
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Mynotes = () => {
  const classes = useStyle();
  const [expanded, setExpanded] = useState([]);
  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Notes = useSelector((state) => state.noteshowreducer);
  const { notes } = Notes;
  const editnote = useSelector((state) => state.noteeditreducer);
  const { success } = editnote;
  const deletednote = useSelector((state) => state.notedeletereducer);
  const { error, success: successdelete } = deletednote;

  const fetchNotes = useCallback(() => {
    dispatch(listNotes());
  }, [dispatch]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes, success, success, successdelete]);

  const handleExpandClick = (id) => {
    notes.reverse()
    setExpanded(notes.map((value, i) => 
      i === notes.length - id - 1 ? (value.expanded = !value.expanded) : (value.expanded = false)
    ))
  };

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <>
      {userInfo ? (
        <Box sx={{ marginTop: "4rem" }}>
          <Grid
            container
            className={classes.container}
            spacing={3}
            justifyContent="center"
          >
            {error && <Errorhandler severity="error">{error}</Errorhandler>}
            {notes
              ? notes.reverse().map((note, i) => (
                  <Grid
                    className={classes.innergrid}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={note._id}
                  >
                    <Card>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                          >
                            {note.title[0]}
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={note.title}
                        subheader={moment(note.expandedatedAt).format(
                          "MMM Do YY"
                        )}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Category: {note.category}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton component={Link} to={`/edit/${note._id}`}>
                          <EditIcon className={classes.edit} />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon
                            className={classes.delete}
                            onClick={() => handleDelete(note._id)}
                          />
                        </IconButton>
                        <ExpandMore
                          expand={note.expanded}
                          onClick={() => handleExpandClick(i)}
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={note.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph>Content:</Typography>
                          <Typography paragraph>{note.content}</Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                ))
              : "You have no notes currently. Make one."}
          </Grid>
          <div className="add-note">
            <Fab
              color="primary"
              aria-label="add"
              component={Link}
              to={"/addnote"}
            >
              <AddIcon />
            </Fab>
          </div>
        </Box>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Mynotes;
