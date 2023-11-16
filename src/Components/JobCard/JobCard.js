import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SaveContext from "../../Context";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import classes from "./JobCard.module.css";
const JobCard = (props) => {
  const { id, title, logo, name, city, state, country, description, benefits } =
    props;
  const navigate = useNavigate();
  const { currIds, setCurrIds } = useContext(SaveContext);
  const detailHandler = () => {
    if (window.innerWidth < "768") {
      navigate(`/detail/${id}`);
    } else {
      props.passId(id);
    }
  };
  const bookmarkHandler = (e) => {
    e.stopPropagation();
    setCurrIds(id);
  };
  return (
    <Card onClick={detailHandler} className={classes.card}>
      <CardContent>
        <div className={classes.cardHeader}>
          <h2>{title}</h2>
          <img src={logo} alt="" />
        </div>
        <div className={classes.cardSubHeading}>
          <div>
            <h4>{name}</h4>
            <div className={classes.line} />
            <LocationOnOutlinedIcon sx={{ color: "#979dac" }} />
            <span>
              {city}, {state}, {country}
            </span>
          </div>
          <Tooltip title="Save" placement="right" arrow>
            <div onClick={bookmarkHandler}>
              {currIds?.includes(id) ? (
                <BookmarkIcon
                  sx={{
                    filter:
                      "invert(46%) sepia(23%) saturate(4646%) hue-rotate(321deg) brightness(102%) contrast(112%)",
                  }}
                />
              ) : (
                <BookmarkBorderOutlinedIcon
                  sx={{
                    filter:
                      "invert(46%) sepia(23%) saturate(4646%) hue-rotate(321deg) brightness(102%) contrast(112%)",
                  }}
                />
              )}
            </div>
          </Tooltip>
        </div>
        <p className={classes.description}>{description}</p>
        {benefits && (
          <>
            <span>Benefits-</span>
            <p className={classes.benefits}>{benefits}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;
