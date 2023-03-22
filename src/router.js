const fs = require("fs");
const path = require("path");
const surahs = require("./surahs.json");
const content_types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".ico": "image/vnd.microsoft.icon",
};

const router = (request, response) => {
  const url = request.url;
  console.log("URL: ", url);

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

  if (url === "/") {
    readFile(getPath("index.html", "..", "public"));
  } else if (url === "/scripts/main.js") {
    readFile(getPath("main.js", "..", "public", "scripts"));
  } else if (url === "/styles/style.css") {
    readFile(getPath("style.css", "..", "public", "styles"));
  } else if (url.split("=")[0] === "/api/search") {
    let search = url.split("=")[1];
    search = decodeURIComponent(search);
    let results = [];
    if (search) {
      results = surahs.data.filter((element) =>
        element.search_key.includes(search)
      );
    }
    fs.writeFile(getPath("results.json"), JSON.stringify(results), (error) => {
      if (error) {
        console.log("error:", error);
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end("<h1>Internal Server Error</h1>");
      } else {
        readFile(getPath("results.json"));
      }
    });
  }
  //   else if (url === "/favicon") {
  //     readFile(getPath("logo.ico", "..", "public", "imgas"));
  //   }
};
module.exports = router;
