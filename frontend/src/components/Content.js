import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import "../assets/css/Content.css";
import AudioPlayer from "./AudioPlayer";

const Content = ({ playlist }) => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const fetchTracks = async () => {
    if (playlist?.playlist?.id) {
      setIsLoading(true);
      try {
        const response = await axios({
          method: "get",
          url: `/api/playlist/${playlist.playlist.id}/tracks`,
        });
        setSongs(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  function formatDuration(duration) {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {
    fetchTracks();
  }, [playlist]);

  useEffect(() => {
    setSongs([]); // Clear songs state whenever playlist prop changes
  }, [playlist]);

  return (
    <Fragment>
      <div className="Content">
        <h2>{playlist?.playlist?.name}</h2>
        {isLoading ? (
          <div className="loading"></div>
        ) : (
          <div className="tracks_list">
            {songs.map((song) => (
              <div
                className="track"
                key={song.name}
                onClick={() => {
                  setSelectedSong(song);
                  console.log(song);
                }}
              >
                <img className="cover" src={song.cover} alt={song.name} />
                <div className="track_items">
                  <h4 className="track-name">{song.name}</h4>
                  <p className="track-artist">{song.artist}</p>
                  <p className="track-duration">
                    {formatDuration(song.duration)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedSong && (
        <AudioPlayer
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          tracksList={songs}
        />
      )}
    </Fragment>
  );
};

export default Content;
