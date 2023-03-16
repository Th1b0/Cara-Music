const router = require("express").Router();
const MusicController = require("../controller/musicController");
const { authenticate } = require("../middleware/authenticate");

router.get("/play/:songname", authenticate, MusicController.playTrack);

module.exports = router;
