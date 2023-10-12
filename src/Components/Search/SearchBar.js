import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import classes from "./SearchBar.module.css";
const SearchBar = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const style = {
    "& label.Mui-focused": {
      color: "#979dac",
    },
  };
  const searchHandler = (e) => {
    console.log("hello");
  };
  return (
    <Box component={"div"} className={classes.container}>
      <SearchOutlinedIcon
        sx={{ marginTop: "16px" }}
        className={classes.icons}
      />
      <TextField
        id="title"
        label="Job title or keyword"
        variant="standard"
        className={classes.textField}
        sx={style}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className={classes.line} />
      <LocationOnOutlinedIcon
        sx={{ marginTop: "16px" }}
        className={classes.icons}
      />
      <TextField
        id="location"
        label="Anywhere"
        variant="standard"
        className={classes.textField}
        sx={style}
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />
      <Button
        variant="contained"
        className={classes.button}
        onClick={searchHandler}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
