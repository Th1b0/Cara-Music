const { httpError } = require("../helper/httpError");
const axios = require("axios");
const qs = require("qs");

class PlaylistController {
  /**
   * Get playlists by playlist ID.
   *
   * @param {Object} req - The request object containing the access_token.
   * @param {Object} res - The response object.
   * @returns {Array} An array of playlists containing playlist name, description, owner, cover, url, tracks, and id.
   */
  static async get(req, res) {
    try {
      const access_token = req.access_token;
      const response = await axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/playlists",
        params: {
          limit: 50,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = response.data.items;
      const playlist = data.map((playlist) => {
        return {
          playlist: {
            name: playlist.name,
            description: playlist.description,
            owner: playlist.owner,
            cover: playlist.images[0].url,
            url: playlist.external_urls.spotify,
            tracks: playlist.tracks,
            id: playlist.id,
          },
        };
      });

      return res.json(playlist);
    } catch (error) {
      console.log(error);
      httpError(res, 401, null);
    }
  }

  /**
   * Get tracks by playlist ID.
   *
   * @param {Object} req - The request object containing the playlist_id and access_token.
   * @param {Object} res - The response object.
   * @returns {Array} An array of tracks containing track name, duration, artist, and cover.
   */
  static async getTracks(req, res) {
    const MAX_TRACK_LIMIT = 50;
    const MAX_PLAYLIST_LIMIT = 100;
    const playlistId = req.params.playlist_id;
    const access_token = req.access_token;

    try {
      let trackResponses = [];
      let offset = 0;
      let totalTracks = 1;

      while (offset < totalTracks) {
        const tracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const tracksResponse = await axios.get(tracksUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            limit: MAX_PLAYLIST_LIMIT,
            offset: offset,
          },
        });
        const tracksData = tracksResponse.data;
        const tracks = tracksData.items;
        if (totalTracks === 1) {
          totalTracks = tracksData.total;
        }
        const trackIds = tracks.map((track) => track.track?.id).filter(Boolean);
        for (let i = 0; i < trackIds.length; i += MAX_TRACK_LIMIT) {
          const trackIdsSubset = trackIds.slice(i, i + MAX_TRACK_LIMIT);
          const tracksDetailsUrl = "https://api.spotify.com/v1/tracks";
          const trackDetailsResponse = await axios.get(tracksDetailsUrl, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
            params: {
              ids: trackIdsSubset.join(","),
            },
          });

          const trackDetailsData = trackDetailsResponse.data;
          const trackDetails = trackDetailsData.tracks;
          const flattenedTracks = trackDetails.map((track) => ({
            name: track.name,
            duration: track.duration_ms,
            artist: track.artists.map((artist) => artist.name).join(", "),
            cover: track.album.images[0]?.url,
          }));
          trackResponses.push(...flattenedTracks);
        }
        offset += MAX_PLAYLIST_LIMIT;
      }
      res.status(200).json(trackResponses);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while retrieving the playlist");
    }
  }
}

module.exports = { PlaylistController };
