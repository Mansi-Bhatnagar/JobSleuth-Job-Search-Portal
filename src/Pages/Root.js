import { Outlet } from "react-router-dom";
import SaveContext from "../Context";
import { StyledEngineProvider } from "@mui/material/styles";
import Navbar from "../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
const Root = () => {
  const [currIds, setCurrIds] = useState(
    localStorage.getItem("savedJobIds")
      ? JSON.parse(localStorage.getItem("savedJobIds"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("savedJobIds", JSON.stringify(currIds));
  }, [currIds]);
  const handleAddRemoveId = (id) => {
    if (currIds.find((currId) => currId === id)) {
      setCurrIds((prev) => {
        let temp = [...prev];
        temp = temp?.filter((currId) => currId !== id);
        return temp;
      });
    } else {
      setCurrIds((prev) => {
        let temp = [...prev];
        temp?.push(id);
        return temp;
      });
    }
  };
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Navbar />
        <SaveContext.Provider
          value={{ currIds, setCurrIds: handleAddRemoveId }}
        >
          <main>
            <Outlet />
          </main>
        </SaveContext.Provider>
      </StyledEngineProvider>
    </>
  );
};

export default Root;
