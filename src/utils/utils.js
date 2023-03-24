const { join } = require("path");
const fs = require("fs");
const axios = require("axios");
const mime_type = require("mime-types");
const search = require("./search");

function getPath(wantedFile, ...folders) {
  return join(__dirname, "..", "..", ...folders, wantedFile);
}

function readFile(response, completedPath) {
  fs.readFile(completedPath, "utf8", (err, file) => {
    if (err) {
      response.writeHead(500, { "content-type": "text/html" });
      response.write("<h1> Internal Server Error! </h1>");
      response.end();
    } else {
      response.writeHead(200, {
        "content-type": mime_type.lookup(completedPath),
      });
      response.end(file);
    }
  });
}
function sendRequest(response, id) {
  axios
    .get(
      `https://api.codetabs.com/v1/proxy?quest=http://api.alquran.cloud/v1/surah/${id}/ar.alafasy`
    )
    .then((res) => {
      response.end(JSON.stringify(res.data.data.ayahs));
    })
    .catch((err) => console.log(err));
}
const searchHandler = (response, endpoint) => {
  const value = decodeURIComponent(endpoint.split("=")[1]);

  fs.readFile(join(__dirname, "..", "surahs.json"), (err, data) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "html/text" });
      response.write("<h1> Internal Server Error! </h1>");
      response.end();
    } else {
      const jsonData = JSON.parse(data.toString());
      let results = search(jsonData.data, value);

      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(results));
      response.end();
    }
  });
};
module.exports = {
  getPath,
  readFile,
  sendRequest,
  searchHandler,
};
