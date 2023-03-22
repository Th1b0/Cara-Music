import Sidebar from "./components/Sidebar.js";
import "./assets/css/Main.css";
import { Fragment } from "react";
function App() {
  return (
    <Fragment>
      <Sidebar />
      <p className="version">v1.0.1-alpha.1</p>
    </Fragment>
  );
}

export default App;
