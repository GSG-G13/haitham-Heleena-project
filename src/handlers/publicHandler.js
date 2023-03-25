const fs = require("fs");
const { join } = require("path");
const mime_type = require("mime-types");

const publicHandler = (request, response, url) => {
  fs.readFile(join(__dirname, "..", "..", "public", url), (err, data) => {
    if (err) {
      response.writeHead(500, { "content-type": "text/html" });
      response.write("<h1> Internal Server Error! </h1>");
      response.end();
    } else {
      response.writeHead(200, {
        "content-type": mime_type.lookup(url),
      });
      response.end(data);
    }
  });
};
module.exports = publicHandler;
