import { Outlet } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import Navbar from "../Components/Navbar/Navbar";
const Root = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </StyledEngineProvider>
    </>
  );
};

export default Root;
