const axios = require("axios");
const client_secret = "27a9cab1d8e8448284c69395b76c6f7e";
const client_id = "a39c9ae3ebfb4f6ebcfda82d65851b27";

/**
 * Get a new acces token from spotify
 *
 * @param {Object} refresh_token - The refresh token needed to request an acces token
 * @returns {Object} with the acces token
 */
async function getNewaccess_token(refresh_token) {
  if (!refresh_token) return res.redirect("/unauthorized");
  const tokenResponse = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    params: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const access_token = tokenResponse.data.access_token;
  return access_token;
}
module.exports = { getNewaccess_token };
