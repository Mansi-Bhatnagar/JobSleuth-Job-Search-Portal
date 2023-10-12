import classes from "./HeroSection.module.css";
import SearchBar from "../Search/SearchBar";
const HeroSection = () => {
  return (
    <div className={classes.container}>
      <h1>Job Hunting Made Simple</h1>
      <span>Unlock your new career working from anywhere in the world.</span>
      <br />
      <span>
        Find here the most exciting <strong>remote-friendly</strong> jobs.
      </span>
      <SearchBar />
    </div>
  );
};
export default HeroSection;
