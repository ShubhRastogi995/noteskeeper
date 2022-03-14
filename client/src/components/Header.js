import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Container, IconButton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {useDispatch, useSelector} from 'react-redux';
import { userlogout } from "../action/userActions";

const useStyle = makeStyles((theme) => ({
  link: {
    color: "inherit",
    textDecoration: "none"
  }
}))

const Header = () => {
  const classes = useStyle()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLogin;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    dispatch(userlogout())
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1, position: "absolute", width: "100%", top: 0 }}>
      <AppBar position="static">
        <Container sx={{ maxWidth: "lg" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/" className={classes.link}>
                Notes Keeper
              </Link>
            </Typography>
            {!userInfo ? (
              <Box sx={{ display: "inline-block" }}>
                <Button color="inherit" component={Link} to={"/login"}>
                  Login
                </Button>
                <Button color="inherit" component={Link} to={"/signup"}>
                  SignUp
                </Button>
              </Box>
            ) : (
              <Box>
                <Button sx={{ color: "white" }}>
                  <Link to="/Mynotes" className={classes.link}>
                    My Notes
                  </Link>
                </Button>
                <IconButton sx={{ color: "white" }} onClick={handleMenu}>
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}><Link to="/profile" className={classes.link}>Edit Profile</Link></MenuItem>
                  <MenuItem onClick={logout}>LogOut</MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
