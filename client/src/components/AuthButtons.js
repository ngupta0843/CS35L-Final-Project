import React ,{ useState } from "react";
import { Button, Box, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./AuthButtons.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../components/redux/reducers/userReducer";

const AuthButtons = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const user = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  }
  const handleNavigation = (action) => {
    setIsDrawerOpen(false); 
    action();
  };

  const menuItems = [
    { text: "Home", action: () => navigate("/") },
    { text: "Profile", action: () => navigate("/profile") },
    { text: "Forum", action: () => navigate("/forum") },
    { text: "Dashboard", action: () => navigate("/dashboard") },
    { text: "Fitness Planner", action: () => navigate("/fitness-planner") },
    { text: "Logout", action: () => { dispatch(logout()); navigate("/"); }, hide: !user.isLoggedIn },
  ];

  return (
    <Box>
      <IconButton
        edge="start"
        color="inherit"
        aria-lable="menu"
        sx={{ position: "absolute", top: 20, right: 20, color: "white"}}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon/ >
      </IconButton>

    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#121212",
          color: "white",
        },
      }}
    >
      <List>
        {menuItems.map(
          (item, index) =>
            (!item.hide || item.hide === undefined) && (
              <ListItem button key={index} onClick={() => handleNavigation(item.action)}>
                <ListItemText primary={item.text} className="auth-button" />
              </ListItem>
            )
        )}
      </List>
    </Drawer>
    <Box
      className="auth-buttons"
      sx={{ position: "absolute", top: 20, right: 80 }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate("/forum")}
        className="auth-button"
        sx={{
          display: !user.isLoggedIn && "none",
          color: "white",
          borderColor: "white",
          marginLeft: 2,
          "&:hover": {
            backgroundColor: "#fff",
            color: "#121212",
            boxShadow: "0 0 15px rgba(255, 255, 255, 1)",
          },
        }}
      >
        Forum
      </Button>
      <Button
        onClick={() => navigate("/")}
        variant="outlined"
        className="auth-button"
        sx={{
          color: "white",
          display: user.isLoggedIn && "none",
          borderColor: "white",
          marginLeft: 2,
          "&:hover": {
            backgroundColor: "#fff",
            color: "#121212",
            boxShadow: "0 0 15px rgba(255, 255, 255, 1)",
          },
        }}
      >
        Home
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate("/login")}
        className="auth-button"
        sx={{
          display: user.isLoggedIn && "none",
          color: "white",
          borderColor: "white",
          marginLeft: 2,
          "&:hover": {
            backgroundColor: "#fff",
            color: "#121212",
            boxShadow: "0 0 15px rgba(255, 255, 255, 1)",
          },
        }}
      >
        Login
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
        className="auth-button"
        sx={{
          display: !user.isLoggedIn && "none",
          color: "white",
          borderColor: "white",
          marginLeft: 2,
          "&:hover": {
            backgroundColor: "#fff",
            color: "#121212",
            boxShadow: "0 0 15px rgba(255, 255, 255, 1)",
          },
        }}
      >
        Logout
      </Button>
      <Button
        variant="outlined"
        className="auth-button"
        onClick={() => navigate("/signup")}
        sx={{
          display: user.isLoggedIn && "none",
          color: "white",
          borderColor: "white",
          marginLeft: 2,
          "&:hover": {
            backgroundColor: "#fff",
            color: "#121212",
            boxShadow: "0 0 15px rgba(255, 255, 255, 1)",
          },
        }}
      >
        Signup
      </Button>
    </Box>
  </Box>
  );
};

export default AuthButtons;
