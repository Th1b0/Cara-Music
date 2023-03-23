import Sidebar from "./components/Sidebar.js";
import axios from "axios";
import "./assets/css/Main.css";
import { Fragment, useState, useEffect } from "react";

function App() {
  const [Authenticated, setAuthenticated] = useState([]);

  const fetchAuth = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/auth",
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
        <div className="unauthorized">
          <p>To try this application you need to login with spotify</p>
          <a href="/api/auth/login" className="loginBtn">
            Login with spotify
          </a>
        </div>
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
