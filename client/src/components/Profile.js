import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userupdateaction } from "../action/userActions";
import Errorhandler from "./Errorhandler";

const useStyle = makeStyles((theme) => ({
    image: {
        borderRadius: "50%",
        marginBottom: "2rem",
        height: "10rem",
        width: "10rem"
    }
}))

const Profile = () => {
  const classes = useStyle();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirm] = useState("");
  const [profpic, setprofpic] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLogin;
  const updateuser = useSelector((state) => state.userupdateReducer);
  const {success, error} = updateuser;

  useEffect(() => {
    if(!userInfo)
        navigate("/");
    else {
        setusername(userInfo.username);
        setemail(userInfo.email);
        setprofpic(userInfo.profpic)
    }
  }, [navigate, userInfo, success])

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

  const submitClick = (e) => {
    e.preventDefault();
    if(password === confirmpassword)
        dispatch(userupdateaction({username, email, password, profpic}));
  }

  return (
    <Container>
      <Box sx={{ marginTop: "4rem", textAlign: "center" }}>
        <Box>
          <h2>Edit your profile here.</h2>
        </Box>
        <Box component="form" noValidate sx={{ mt: 4 }}>
          {success && (
            <Errorhandler severity="success">Updated Successfully</Errorhandler>
          )}
          {error && <Errorhandler severity="error">{error}</Errorhandler>}
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <img src={profpic} className={classes.image} alt="profilepic" />
              <label htmlFor="icon-button-file">
                  <PhotoCamera sx={{color: "#1976d2"}} />
              </label>
              <input
                accept="image/*"
                id="icon-button-file"
                onChange={(e) => {
                  postpic(e.target.files[0]);
                }}
                type="file"
                style={{ display: "none" }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                sx={{
                  maxWidth: "70vw",
                  marginBottom: "1rem",
                }}
                required
                fullWidth
                value={username}
                label="Username"
                name="Username"
                onChange={(e) => setusername(e.target.value)}
                autoFocus
              />
              <TextField
                sx={{
                  maxWidth: "70vw",
                  marginBottom: "1rem",
                }}
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
                sx={{
                  maxWidth: "70vw",
                  marginBottom: "1rem",
                }}
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
              <TextField
                sx={{
                  maxWidth: "70vw",
                  marginBottom: "1rem",
                }}
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                value={confirmpassword}
                id="confirmpasswordpassword"
                onChange={(e) => setconfirm(e.target.value)}
                autoComplete="current-password"
              />
              <Button variant="contained" onClick={submitClick}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
