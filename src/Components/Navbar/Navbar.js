import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import logo from "../../Assets/jobSleuth.png";
import classes from "./Navbar.module.css";
const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <img src={logo} alt="logo" className={classes.logo} />
      <Toolbar className={classes.links}>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          to="/"
        >
          <span>Home</span>
          <HomeOutlinedIcon className={classes.icons} />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          to="/saved"
        >
          <span>Saved</span>
          <BookmarkBorderOutlinedIcon className={classes.icons} />
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
