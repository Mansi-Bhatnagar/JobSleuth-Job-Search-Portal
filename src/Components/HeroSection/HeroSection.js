import classes from "./HeroSection.module.css";
import SearchBar from "../Search/SearchBar";
const HeroSection = (props) => {
  const inputInfo = (title, location) => {
    props.inputInfo(title, location);
  };
  return (
    <div className={classes.container}>
      <h1>Job Hunting Made Simple</h1>
      <span>Unlock your new career working from anywhere in the world.</span>
      <br />
      <span>
        Find here the most exciting <strong>remote-friendly</strong> jobs.
      </span>
      <SearchBar inputInfo={inputInfo} />
    </div>
  );
};
export default HeroSection;
