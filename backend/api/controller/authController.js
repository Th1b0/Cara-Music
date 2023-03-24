const { httpError } = require("../helper/httpError");
const axios = require("axios");
const qs = require("qs");
const dotenv = require("dotenv");
dotenv.config();
const client_secret = process.env.client_secret;
const client_id = process.env.client_id;
const callback_url = process.env.callback_url;
class AuthController {
  static async auth(req, res) {
    try {
      const access_token = req.access_token;
      const response = await axios({
        method: "get",
        url: "https://api.spotify.com/v1/me",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return res.json(response.data);
    } catch (error) {
      console.log(error);
      httpError(res, 401, null);
    }
  }
  static async login(req, res) {
    try {
      const scopes =
        "user-read-email user-read-private playlist-read-private playlist-read-collaborative user-library-read user-library-modify";

      res.redirect(
        "https://accounts.spotify.com/authorize?" +
          qs.stringify({
            client_id: client_id,
            response_type: "code",
            redirect_uri: callback_url,
            scope: scopes,
            show_dialog: true,
          })
      );
    } catch (error) {
      httpError(res, 401, null);
      console.log(error);
    }
  }
  static async callback(req, res) {
    try {
      const code = req.query.code || null;
      const response = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        params: {
          code: code,
          redirect_uri: callback_url,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${client_id}:${client_secret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      const expires = response.data.expires_in;

      return res
        .cookie("access_token", access_token, {
          httpOnly: true,
          maxAge: expires * 1_000,
        })
        .cookie("refresh_token", refresh_token, {
          httpOnly: true,
          maxAge: 31_536_000_000,
        })
        .redirect("/");
    } catch (error) {
      httpError(res, 400, null);
      console.log(error);
    }
  }
  static async logout(req, res) {
    try {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      res.redirect("/");
    } catch (error) {
      httpError(res, 400, null);
    }
  }
}

module.exports = { AuthController };
