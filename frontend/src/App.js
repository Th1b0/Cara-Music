import Sidebar from "./components/Sidebar.js";
import axios from "axios";
import "./assets/css/Main.css";
import React, { Fragment, useState, useEffect } from "react";

function App() {
  const [Authenticated, setAuthenticated] = useState([]);

  const fetchAuth = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3001/api/auth",
        withCredentials: true,
      });
      if (response.data.code == "200") {
        setAuthenticated(true);
      }
    } catch (error) {
      setAuthenticated(false);
    }
  };
  useEffect(() => {
    fetchAuth();
  }, []);
  return (
    <Fragment>
      {!Authenticated && (
        <Fragment>
          <div className="unauthorized">
            <p>
              To try this application you need to login with spotify.
              <br /> Why?
              <br />
              Because the app is still incomplete and can only stream music from
              spotify playlists. No DATA is stored on music.thibokuijpers.be
              servers.
            </p>
            <a href="http://localhost:3001/api/auth/login" className="loginBtn">
              Login with spotify
            </a>
          </div>
          <p className="version">v1.0.0-beta.1</p>
        </Fragment>
      )}
      {Authenticated && (
        <Fragment>
          <Sidebar />
          <p className="version">v1.0.0-beta.1</p>
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
