import { useParams } from "react-router-dom";
import { options } from "../../config";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Loader from "../Loader/Loader";
import ApplyModal from "../ApplyModal/ApplyModal";
import classes from "./JobCardDetail.module.css";
const JobCardDetail = (props) => {
  let { id } = useParams();
  const [currId, setCurrId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [detailData, setDetailData] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [jobCountry, setJobCountry] = useState("");
  const [jobCity, setJobCity] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobBenefits, setJobBenefits] = useState([]);
  const [jobQualifications, setJobQualifications] = useState([]);
  const [jobSkills, setJobSkills] = useState("");
  const [jobEmploymentType, setJobEmploymentType] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (window.innerWidth > 768) {
      setCurrId(props.id);
    } else {
      setCurrId(id);
    }
  }, [currId, window.innerWidth, id, props.id]);

  async function jobDetail() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/job-details?job_id=${currId}&extended_publisher_details=false`,
        options
      );
      const data = await response.json();
      setDetailData(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    if (currId) jobDetail();
  }, [currId]);
  useEffect(() => {
    if (!isLoading && detailData) {
      setJobTitle(detailData?.data[0]?.job_title || "");
      setEmployerName(detailData?.data[0]?.employer_name || "");
      setJobCountry(detailData?.data[0]?.job_country || "");
      setJobCity(detailData?.data[0]?.job_city || "");
      setMinSalary(detailData?.data[0]?.job_min_salary || "");
      setMaxSalary(detailData?.data[0]?.job_max_salary || "");
      setJobDescription(detailData?.data[0]?.job_description || "");
      setJobBenefits(detailData?.data[0]?.job_highlights?.Benefits || ""); //array
      setJobQualifications(
        detailData?.data[0]?.job_highlights?.Qualifications || ""
      ); //array
      setJobSkills(detailData?.data[0]?.job_required_skills || "");
      setJobEmploymentType(detailData?.data[0]?.job_employment_type || "");
    }
  }, [detailData]);
  return (
    <>
      {isLoading && <Loader />}
      <Card className={classes.container}>
        {!isLoading && detailData && (
          <CardContent>
            <div className={classes.info}>
              <div className={classes.heading}>
                <h2>{jobTitle}</h2>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleOpen}
                >
                  Apply Now
                </Button>
              </div>
              <div className={classes.subHeading}>
                <h3>{employerName}</h3>
                <div className={classes.line} />
                <LocationOnOutlinedIcon sx={{ color: "#979dac" }} />
                {jobCity && jobCountry && (
                  <span>
                    {jobCity}, {jobCountry}
                  </span>
                )}
              </div>

              <div>
                <Button variant="contained" className={classes.tags}>
                  {jobEmploymentType}
                </Button>

                {minSalary && maxSalary && (
                  <Button variant="contained" className={classes.tags}>
                    {minSalary} - {maxSalary}
                  </Button>
                )}
              </div>
            </div>
            <div className={classes.detail}>
              {jobDescription && (
                <>
                  <h3>Job Description</h3>
                  <span>{jobDescription}</span>
                </>
              )}
              {jobSkills && (
                <>
                  <h3>Skills Required</h3>
                  <span>{jobSkills}</span>
                </>
              )}
              {jobBenefits && (
                <>
                  <h3>Benefits</h3>
                  {jobBenefits.map((item) => {
                    return <span>{item}</span>;
                  })}
                </>
              )}
              {jobQualifications && (
                <>
                  <h3>Qualifications</h3>
                  {jobQualifications.map((item) => {
                    return <span>{item}</span>;
                  })}
                </>
              )}
            </div>
            <ApplyModal open={open} onClose={handleClose} />
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default JobCardDetail;
