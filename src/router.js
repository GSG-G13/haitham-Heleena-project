const { sendRequest, searchHandler } = require("./utils/utils");
const homeRouting = require("./handlers/homeHandler");
const publicHandler = require("./handlers/publicHandler");

const router = (request, response) => {
  const url = request.url;
  if (url === "/") {
    homeRouting(request, response);
  } else if (
    url.includes("scripts") ||
    url.includes("styles") ||
    url === "favicon.ico"
  )
    publicHandler(request, response, url);
  else if (url.startsWith("/api/search")) searchHandler(response, url);
  else if (url.startsWith("/api/selected"))
    sendRequest(response, url.split("=")[1]);
  else response.end("404 Page Not Found");
};
module.exports = router;
