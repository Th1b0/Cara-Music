const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const auth = require("./api/routes/authRoutes");
const playlist = require("./api/routes/playlistRoutes");
const music = require("./api/routes/musicRoutes");

app.use(cors());
app.use(cookieParser());
app.set("json spaces", 2);
app.use("/api/auth", auth);
app.use("/api/playlist", playlist);
app.use("/api/music", music);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  const { exec } = require("child_process");
  exec("git branch --show-current", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`The current branch is ${stdout}`);
    }
  });
});
