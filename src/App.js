import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/Root";
import HomePage from "./Pages/Home";
import Saved from "./Pages/Saved";
import JobCardDetail from "./Components/JobCardDetail/JobCardDetail";
const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "detail/:id", element: <JobCardDetail /> },
      { path: "saved", element: <Saved /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
