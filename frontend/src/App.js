import AudioPlayer from "./components/AudioPlayer.js";
import Sidebar from "./components/Sidebar.js";
import "./assets/css/Main.css";
import { Fragment } from "react";
function App() {
  return (
    <Fragment>
      <AudioPlayer />
      <Sidebar />
    </Fragment>
  );
}

export default App;
