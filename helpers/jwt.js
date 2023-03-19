var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, method: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/orders(.*)/, methods: ["OPTIONS", "POST"] },
      `${api}/users/login`,
      `${api}/users/register`,
      // { url: /(.*)/ },
    ],
  });
}

async function isRevoked(req, token) {
  if (token.payload.isAdmin === false) {
    return true;
  }
  return false;
}

module.exports = authJwt;
