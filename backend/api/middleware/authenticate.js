const { httpError } = require("../helper/httpError");
const { getNewaccess_token } = require("../helper/refreshAccesToken");

/**
 * Checks if the user is authenticated
 *
 * @param {Object} req - The Express request object containing the acces token and refresh token
 * @param {Object} res - The Express response object.
 * @returns {Function} to go to the destination route
 */
async function authenticate(req, res, next) {
  let access_token = req.cookies.access_token;
  console.log(access_token);
  const refresh_token = req.cookies.refresh_token;
  if (!refresh_token) return httpError(res, 401, null);
  if (!access_token) {
    try {
      const access_token = await getNewaccess_token(refresh_token);
      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 3600 * 1000,
        domain: "localhost:3000", // Set the domain to 'localhost' to allow access from all subdomains
        secure: false, // Set to 'true' if using HTTPS
        sameSite: "none", // Set to 'none' if allowing cross-origin requests
      });
      req.access_token = access_token;
      return next();
    } catch (error) {
      return httpError(res, 401, null);
    }
  } else {
    req.access_token = access_token;
    return next();
  }
}
module.exports = { authenticate };
