import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Content from "./Content";
import "../assets/css/Sidebar.css";

const Sidebar = () => {
  const [playlist, setPlaylist] = useState([]);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const fetchPlaylists = async () => {
    const response = await axios({
      method: "get",
      url: "/api/playlist",
    });
    setPlaylist(response.data);
  };
  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <Fragment>
      <nav className="Sidebar">
        <ul className="playlist_list">
          <li className="sidebar_menu">Home</li>
          <li className="sidebar_menu">Search</li>
          <li className="sidebar_menu">Library</li>
          <hr></hr>
          {playlist.map((playlist) => (
            <li
              onClick={() => handlePlaylistClick(playlist)}
              className="playlist_item"
              key={playlist.playlist.id}
            >
              {playlist.playlist.name}
            </li>
          ))}
        </ul>
      </nav>
      {selectedPlaylist && <Content playlist={selectedPlaylist} />}
    </Fragment>
  );
};

export default Sidebar;
