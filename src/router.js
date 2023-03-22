const fs = require("fs");
const { request } = require("https");
const path = require("path");
const surahs = require("./surahs.json");
const axios = require("axios");
let results = [];
const content_types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".ico": "image/vnd.microsoft.icon",
};
// xhr send req, 
// req recieve to 

const router = (request, response) => {
  const url = request.url;
  function getPath(
    wantedFile,
    folder1 = "",
    folder2 = "",
    folder3 = "",
    folder4 = ""
  ) {
    if (folder1) {
      if (folder2) {
        if (folder3) {
          if (folder4) {
            return path.join(
              __dirname,
              folder1,
              folder2,
              folder3,
              folder4,
              wantedFile
            );
          }
          return path.join(__dirname, folder1, folder2, folder3, wantedFile);
        }
        return path.join(__dirname, folder1, folder2, wantedFile);
      }
      return path.join(__dirname, folder1, wantedFile);
    }
    return path.join(__dirname, wantedFile);
  }
  // function writeFile(path, results) {
  //   fs.writeFile(path, JSON.stringify(results), (error) => {
  //     if (error) {
  //       console.log("error:", error);
  //       response.writeHead(500, { "Content-Type": "text/html" });
  //       response.end("<h1>Internal Server Error</h1>");
  //     } else {
  //       readFile(path);
  //     }
  //   });
  // }
  function readFile(completedPath) {
    const extname = path.extname(completedPath);
    fs.readFile(completedPath, "utf8", (err, file) => {
      if (err) {
        response.writeHead(500, { "content-type": "text/plain" });
        response.end("server error");
      } else {
        response.writeHead(200, { "content-type": content_types[extname] });
        response.end(file);
      }
    });
  }
  function sendRequest(response, id) {
    axios
      .get(
        `https://api.codetabs.com/v1/proxy?quest=http://api.alquran.cloud/v1/surah/${id}/ar.alafasy`
      )
      // Show response data
      .then((res) => {
        response.end(JSON.stringify(res.data.data.ayahs));
      })
      .catch((err) => console.log(err));
  }
  if (url === "/") {
    readFile(getPath("index.html", "..", "public"));
  } else if (url === "/scripts/main.js") {
    readFile(getPath("main.js", "..", "public", "scripts"));
  } else if (url === "/styles/style.css") {
    readFile(getPath("style.css", "..", "public", "styles"));
  } else if (url.split("=")[0] === "/api/search") {
    let search = url.split("=")[1];
    search = decodeURIComponent(search);

    if (search) {
      results = surahs.data.filter((element) =>
        element.search_key.includes(search)
      );
    }
    response.end(JSON.stringify(results));
    // writeFile(getPath("results.json",results));

  } else if (url.split("=")[0] === "/api/selected") {
    let selected_id = url.split("=")[1];
    sendRequest(response, selected_id);
  }

  //   else if (url === "/favicon") {
  //     readFile(getPath("logo.ico", "..", "public", "imgas"));
  //   }
};
module.exports = router;
