import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Content from "./Content";
import "../assets/css/Sidebar.css";

const Sidebar = () => {
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const fetchPlaylists = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3001/api/playlist",
        withCredentials: true,
      });
      setPlaylist(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            <Fragment>
              {playlist.map((playlist) => (
                <li
                  onClick={() => handlePlaylistClick(playlist)}
                  className="playlist_item"
                  key={playlist.playlist.id}
                >
                  {playlist.playlist.name}
                </li>
              ))}
            </Fragment>
          )}
        </ul>
      </nav>
      {selectedPlaylist && <Content playlist={selectedPlaylist} />}
    </Fragment>
  );
};

export default Sidebar;
