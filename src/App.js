import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/Root";
import HomePage from "./Pages/Home";
const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [{ path: "", element: <HomePage /> }],
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
