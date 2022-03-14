import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${"https://cdn.pixabay.com/photo/2017/04/20/13/24/greeting-card-2245717_1280.png"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  maintext: {
    width: "100%",
    textAlign: "center"
  },
  heading: {
    fontSize: "2rem"
  },
  subheading: {
    fontSize: "1.3rem",
    marginTop: "1px"
  },
  st: {
    justifyContent: "center",
    marginTop: "2.5rem"
  }
}));

const Home = () => {
    const classes = useStyle();
    return (
      <Box className={classes.root}>
        <Container>
          <Box className={classes.maintext}>
            <Box>
              <h2 className={classes.heading}>Welcome to NotesKeeper!</h2>
              <Typography className={classes.subheading}>
                Please SignUp or LogIn to view your notes or make a new one.
              </Typography>
            </Box>
            <Stack spacing={5} direction="row" className={classes.st}>
              <Button variant="contained" component={Link} to={"/login"}>
                LogIn
              </Button>
              <Button variant="outlined" component={Link} to={"/signup"}>
                SignUp
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    );
}

export default Home;
