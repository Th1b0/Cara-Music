import AudioPlayer from "./components/AudioPlayer.js";
import Sidebar from "./components/Sidebar.js";
import Content from "./components/Content.js";
import "./assets/css/Main.css";
import { Fragment } from "react";
function App() {
  return (
    <Fragment>
      <AudioPlayer />
      <Sidebar />
      <Content />
    </Fragment>
  );
}

export default App;
