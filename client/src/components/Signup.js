import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import Errorhandler from "./Errorhandler";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../action/userActions";


const theme = createTheme();

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};

export default function Signup() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [profpic, setprofpic] = useState(
    "https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userSignupReducer);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) navigate("/Mynotes");
  }, [navigate, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(register(username, email, password, profpic));
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      setSelectedImage(e.target.files[0]);
      postpic(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    document.getElementById("icon-button-file").value = null;
    setSelectedImage(null);
  };

  const postpic = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "Notes Keeper");
    data.append("cloud_name", "iloveporn");
    fetch("https://api.cloudinary.com/v1_1/iloveporn/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setprofpic(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://st.depositphotos.com/1116685/1237/i/600/depositphotos_12372419-stock-photo-recycle-notebook.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {error && <Errorhandler severity="error">{error}</Errorhandler>}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 0 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                value={username}
                label="Username"
                name="Username"
                onChange={(e) => setusername(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setemail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                id="password"
                onChange={(e) => setpassword(e.target.value)}
                autoComplete="current-password"
              />
              <input
                accept="image/*"
                id="icon-button-file"
                onChange={imageChange}
                type="file"
                style={{ display: "none" }}
              />
              {selectedImage && (
                <div style={styles.preview}>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    style={styles.image}
                    alt="Thumb"
                  />
                  <button onClick={removeSelectedImage} style={styles.delete}>
                    Remove This Image
                  </button>
                </div>
              )}
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>{" "}
              Upload Image
              {!loading ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 1 }}
                >
                  Sign Up
                </Button>
              ) : (
                <Loader />
              )}
              <Grid container>
                <Grid item>
                  <Link to={"/login"} variant="body2">
                    {"Already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
