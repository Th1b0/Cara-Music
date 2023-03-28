class MusicController {
  /**
   * GET a song by metadata and stream it to the client using YouTube.
   *
   * @param {Object} req - The Express request object containing the query with the metedata
   * @param {Object} res - The Express response object.
   * @returns {Audio} An audio stream of the requested song.
   *
   * @todo Add caching, refactor error handling, and improve range request handling.
   * @notes I don't think the range request are working correctly.
   *
   * @timefixing 2 hours
   */
  static async playTrack(req, res) {
    const ytdl = require("ytdl-core");
    const rangeParser = require("range-parser");
    const ytsr = require("ytsr");
    const songname = req.params.songname;
    const searchResults = await ytsr(songname);
    const firstResult = searchResults.items.filter(
      (result) => result.type === "video"
    )[0];
    const audioUrl = `https://www.youtube.com/watch?v=${firstResult.id}`;
    const audioInfo = await ytdl.getInfo(audioUrl);
    const audioFormats = ytdl.filterFormats(audioInfo.formats, "audioonly");
    const audio = ytdl(audioUrl, {
      format: audioFormats[0],
      range: req.headers.range,
    });
    const contentLength = audioFormats[0].contentLength;

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", contentLength);
    res.setHeader("Accept-Ranges", "bytes");

    const range = req.headers.range;
    if (range) {
      const ranges = rangeParser(contentLength, range);
      if (ranges === -1 || ranges === -2) {
        res.status(416).send("Requested Range Not Satisfiable");
        return;
      }
      const start = ranges[0].start;
      const end = ranges[0].end;
      res.status(206).header({
        "Content-Range": `bytes ${start}-${end}/${contentLength}`,
        "Content-Length": end - start + 1,
      });
      audio
        .pipe(res.status(206))
        .status(206)
        .set("Content-Length", end - start + 1);
      res.on("close", () => {
        audio.destroy();
      });
      audio.on("error", (err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
    } else {
      res.setHeader("Content-Length", contentLength);
      res.on("close", () => {
        audio.destroy();
      });
      audio.on("error", (err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
      audio.pipe(res);
    }
  }
}

module.exports = MusicController;
