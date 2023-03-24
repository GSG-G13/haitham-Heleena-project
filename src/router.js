const {
  getPath,
  readFile,
  sendRequest,
  searchHandler,
} = require("./utils/utils");
const router = (request, response) => {
  const url = request.url;
  if (url === "/") {
    readFile(response, getPath("index.html", "public"));
  } else if (url === "/scripts/main.js") {
    readFile(response, getPath("main.js", "public", "scripts"));
  } else if (url === "/scripts/dom.js") {
    readFile(response, getPath("dom.js", "public", "scripts"));
  } else if (url === "/styles/style.css") {
    readFile(response, getPath("style.css", "public", "styles"));
  } else if (url.startsWith("/api/search")) {
    searchHandler(response, url);
  } else if (url.startsWith("/api/selected")) {
    sendRequest(response, url.split("=")[1]);
  }
};
module.exports = router;
