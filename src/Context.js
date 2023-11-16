import { createContext } from "react";

const SaveContext = createContext({
  currIds: [],
  setCurrIds: (id) => {},
});
export default SaveContext;
