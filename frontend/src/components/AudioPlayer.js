import React, { useEffect, useRef, useState } from "react";
import "../assets/css/AudioPlayer.css";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { faFastForward } from "@fortawesome/free-solid-svg-icons";
import { faFastBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AudioPlayer = ({ selectedSong, setSelectedSong, tracksList }) => {
  const audioRef = useRef(null);
  const [artist, setArtist] = useState([]);
  const [title, setTitle] = useState([]);
  const [cover, setCover] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [id, setId] = useState([]);
  const [isSeeking, setIsSeeking] = useState([false]);

  useEffect(() => {
    if (selectedSong) {
      const query = `${selectedSong.name} ${selectedSong.artist}`;
      audioRef.current.src = `/api/music/play/${query.replace(/\//g, "-")}`;
      audioRef.current.addEventListener("canplay", () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener("ended", handleNextTrack);
      audioRef.current.play();

      // Update title and artist
      setTitle(selectedSong.name);
      setArtist(selectedSong.artist);
      setCover(selectedSong.cover);
      setIsPlaying(true);
      setId(selectedSong.id);
    }
  }, [selectedSong]);

  const handleNextTrack = () => {
    const tracks_id = tracksList.map((track) => {
      return `${track.name}${track.artist}${track.duration}`;
    });
    const currentIndex = tracks_id.indexOf(
      `${selectedSong.name}${selectedSong.artist}${selectedSong.duration}`,
      0
    );
    let nextTrack;
    if (currentIndex + 2 > tracksList.length) {
      nextTrack = tracksList[0];
    } else {
      nextTrack = tracksList[currentIndex + 1];
    }

    setSelectedSong(nextTrack);
  };

  const handlePrevTrack = () => {
    const tracks_id = tracksList.map((track) => {
      return `${track.name}${track.artist}${track.duration}`;
    });
    const currentIndex = tracks_id.indexOf(
      `${selectedSong.name}${selectedSong.artist}${selectedSong.duration}`,
      0
    );
    let prevTrack;
    if (currentIndex - 1 < 0) {
      prevTrack = tracksList[tracksList.length - 1];
    } else {
      prevTrack = tracksList[currentIndex - 1];
    }

    setSelectedSong(prevTrack);
    console.log(prevTrack);
  };
  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleDurationChange = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
    audioRef.current.currentTime = currentTime;
  };

  const handleSeekChange = (e) => {
    if (audioRef.current) {
      setCurrentTime(e.target.value);
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="AudioPlayer">
      <div className="audio_items">
        <div className="metadata_controls_container">
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onDurationChange={handleDurationChange}
          />
          <div className="meteData">
            <h2 className="title">{title}</h2>
            <p className="artist">{artist}</p>
          </div>
          <div className="controls">
            <FontAwesomeIcon
              onClick={handlePrevTrack}
              className="icon"
              icon={faFastBackward}
            />
            <FontAwesomeIcon
              className="icon"
              icon={isPlaying ? faPause : faPlay}
              onClick={handlePlayPause}
            />
            <FontAwesomeIcon
              onClick={handleNextTrack}
              className="icon"
              icon={faFastForward}
            />
            <div className="seekBar">
              <span className="currentTime">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration}
                value={
                  isSeeking
                    ? currentTime
                    : audioRef.current
                    ? audioRef.current.currentTime
                    : 0
                }
                onChange={handleSeekChange}
                onMouseDown={handleSeekStart}
                onMouseUp={handleSeekEnd}
              />
              <span className="duration">{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <img src={cover}></img>
      </div>
    </div>
  );
};

export default AudioPlayer;
