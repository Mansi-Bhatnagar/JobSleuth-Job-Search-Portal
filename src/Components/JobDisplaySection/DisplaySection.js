import { useEffect, useState } from "react";
import { options } from "../../config";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import JobCard from "../JobCard/JobCard";
import JobCardDetail from "../JobCardDetail/JobCardDetail";
import Loader from "../Loader/Loader";
import classes from "./DisplaySection.module.css";
const DisplaySection = (props) => {
  const { inpTitle, inpLocation } = props;
  const [datePosted, setDatePosted] = useState("");
  const [jobType, setJobType] = useState("");
  const [radius, setRadius] = useState("");
  const [employmentType, setEmploymentType] = useState([]);
  const [jobRequirement, setJobRequirement] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [resultData, setResultData] = useState("");
  const [currId, setCurrId] = useState("");
  const [jobs, setJobs] = useState([]);
  const style = {
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "&.MuiButtonBase-root .MuiMenuItem-root": {
      fontFamily: "Roboto Slab,serif",
      color: "#979dac",
    },
  };
  const types = [
    { key: "Fulltime", value: "FULLTIME" },
    { key: "Contractor", value: "CONTRACTOR" },
    { key: "Parttime", value: "PARTTIME" },
    { key: "Intern", value: "INTERN" },
  ];
  const requirements = [
    { key: "Under 3 years experience", value: "under_3_years_experience" },
    {
      key: "More than 3 years experience",
      value: " more_than_3_years_experience",
    },
    { key: "No experience", value: "no_experience" },
    { key: "No degree", value: " no_degree" },
  ];
  const typeHandler = (e) => {
    const {
      target: { value },
    } = e;
    setEmploymentType(typeof value === "string" ? value.split(",") : value);
  };
  const requirementHandler = (e) => {
    const {
      target: { value },
    } = e;
    setJobRequirement(typeof value === "string" ? value.split(",") : value);
  };
  const dateHandler = (e) => {
    setDatePosted(e.target.value);
  };
  const jobTypeHandler = (e) => {
    setJobType(e.target.value);
  };
  const radiusHandler = (e) => {
    setRadius(e.target.value);
  };
  const passId = (id) => {
    setCurrId(id);
  };
  async function jobFunc() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${inpTitle}%20in%20${inpLocation}${
          datePosted.length > 0 ? `&date_posted=${datePosted}` : ""
        }${jobType.length > 0 ? `&remote_jobs_only=${jobType}` : ""}${
          employmentType.length > 0 ? `&employment_types=${employmentType}` : ""
        }${
          jobRequirement.length > 0 ? `&job_requirements=${jobRequirement}` : ""
        }${radius !== "" ? `&radius=${radius}` : ""}`,
        options
      );
      const data = await response.json();
      setResultData(data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    if (inpTitle.length > 0 && inpLocation.length > 0) {
      jobFunc();
    }
  }, [
    inpTitle,
    inpLocation,
    datePosted,
    jobType,
    radius,
    employmentType,
    jobRequirement,
  ]);
  useEffect(() => {
    if (!isLoading && resultData.data) {
      setJobs(
        resultData?.data?.map((job, index) => {
          if (index == 0) {
            setCurrId(job.job_id || "");
          }
          return (
            <JobCard
              key={job.job_id || ""}
              id={job.job_id || ""}
              title={job.job_title || ""}
              logo={job.employer_logo || ""}
              name={job.employer_name || ""}
              city={job.job_city || ""}
              state={job.job_state || ""}
              country={job.job_country || ""}
              description={job.job_description || ""}
              benefits={job.job_highlights?.Benefits || ""}
              passId={passId}
            />
          );
        })
      );
    }
  }, [resultData, isLoading]);

  return (
    <>
      <div className={classes.wrapper}>
        <FormControl
          size="small"
          sx={{ m: 1, minWidth: "150px" }}
          className={classes.container}
        >
          <InputLabel id="date-posted" className={classes.label}>
            Date Posted
          </InputLabel>
          <Select
            labelId="date-posted"
            id="date-posted"
            value={datePosted}
            label="Date Posted"
            onChange={dateHandler}
            sx={style}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"today"}>Today</MenuItem>
            <MenuItem value={"3days"}>3 days ago</MenuItem>
            <MenuItem value={"week"}>Week ago</MenuItem>
            <MenuItem value={"month"}>Month ago</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ m: 1, minWidth: "200px" }}
          className={classes.container}
        >
          <InputLabel id="remote-jobs-only" className={classes.label}>
            Remote Jobs Only
          </InputLabel>
          <Select
            labelId="remote-jobs-only"
            id="remote-jobs-only"
            value={jobType}
            label="Remote Jobs Only"
            onChange={jobTypeHandler}
            sx={style}
          >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ m: 1, minWidth: "120px" }}
          className={classes.container}
        >
          <InputLabel id="radius" className={classes.label}>
            Radius
          </InputLabel>
          <Select
            labelId="radius"
            id="radius"
            value={radius}
            label="Radius"
            onChange={radiusHandler}
            sx={style}
            className={classes.select}
          >
            <MenuItem value={10}>10km</MenuItem>
            <MenuItem value={50}>50km</MenuItem>
            <MenuItem value={100}>100km</MenuItem>
            <MenuItem value={200}>200km</MenuItem>
            <MenuItem value={500}>500km</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ m: 1, width: "200px" }}
          className={classes.container}
        >
          <InputLabel id="employment-type" className={classes.label}>
            Employment Type
          </InputLabel>
          <Select
            labelId="employment-type"
            id="employment-type"
            multiple
            value={employmentType}
            onChange={typeHandler}
            input={<OutlinedInput label="Employment Type" />}
            renderValue={(selected) => selected.join(", ")}
            sx={style}
          >
            {types.map((type) => (
              <MenuItem key={type.key} value={type.value}>
                <Checkbox checked={employmentType.indexOf(type.value) > -1} />
                <ListItemText primary={type.key} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ m: 1, width: "200px" }}
          className={classes.container}
        >
          <InputLabel id="job-requirement" className={classes.label}>
            Job Requirement
          </InputLabel>
          <Select
            labelId="job-requirement"
            id="job-requirement"
            multiple
            value={jobRequirement}
            onChange={requirementHandler}
            input={<OutlinedInput label="Job Requirement" />}
            renderValue={(selected) => selected.join(", ")}
            sx={style}
          >
            {requirements.map((requirement) => (
              <MenuItem key={requirement.key} value={requirement.value}>
                <Checkbox
                  checked={jobRequirement.indexOf(requirement.value) > -1}
                />
                <ListItemText primary={requirement.key} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div
        className={classes.main}
        style={{ marginTop: isLoading ? "60px" : "0" }}
      >
        {isLoading ? (
          <Loader />
        ) : jobs && jobs.length ? (
          <>
            <div className={classes.jobCardContainer}>{jobs}</div>
            <div className={classes.jobDetailContainer}>
              <JobCardDetail id={currId} />
            </div>
          </>
        ) : (
          <p>No results found. Try searching some other keywords.</p>
        )}
      </div>
    </>
  );
};

export default DisplaySection;
