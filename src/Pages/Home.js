import { useState } from "react";
import HeroSection from "../Components/HeroSection/HeroSection";
import DisplaySection from "../Components/JobDisplaySection/DisplaySection";
const Home = () => {
  const [inpTitle, setInpTitle] = useState("");
  const [inpLocation, setInpLocation] = useState("");
  const inputInfo = (title, location) => {
    setInpTitle(title);
    setInpLocation(location);
  };
  return (
    <>
      <HeroSection inputInfo={inputInfo} />
      <DisplaySection inpTitle={inpTitle} inpLocation={inpLocation} />
    </>
  );
};

export default Home;
