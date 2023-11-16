import { useContext, useState, useEffect } from "react";
import { options } from "../config";
import SaveContext from "../Context";
import Loader from "../Components/Loader/Loader";
import JobCard from "../Components/JobCard/JobCard";
import JobCardDetail from "../Components/JobCardDetail/JobCardDetail";
import classes from "./Saved.module.css";
const Saved = () => {
  const { currIds } = useContext(SaveContext);
  const [isLoading, setIsLoading] = useState();
  const [jobData, setJobData] = useState();
  const [jobs, setJobs] = useState([]);
  const [currId, setCurrId] = useState("");
  async function jobInfo() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/job-details?job_id=${currIds?.join(
          ","
        )}&extended_publisher_details=false`,
        options
      );
      const data = await response.json();
      setJobData(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }
  const passId = (id) => {
    setCurrId(id);
  };
  useEffect(() => {
    if (currIds && currIds.length) jobInfo();
    else {
      setIsLoading(false);
    }
  }, [currIds]);
  useEffect(() => {
    if (!isLoading && jobData?.data) {
      setJobs(
        jobData?.data?.map((job, index) => {
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
  }, [isLoading, jobData]);
  return (
    <div className={classes.main} style={{ marginTop: "100px" }}>
      {isLoading ? (
        <Loader />
      ) : currIds && currIds.length ? (
        <>
          <div className={classes.jobCardContainer}>{jobs}</div>
          <div className={classes.jobDetailContainer}>
            <JobCardDetail id={currId} />
          </div>
        </>
      ) : (
        <p>The jobs you will save will appear here.</p>
      )}
    </div>
  );
};

export default Saved;
