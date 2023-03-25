const fs = require("fs");
const { join } = require("path");

const homeHandler = (request, response) => {
  fs.readFile(
    join(__dirname, "..", "..", "public", "index.html"),
    (err, data) => {
      if (err) {
        response.writeHead(500, { "content-type": "text/html" });
        response.write("<h1> Internal Server Error! </h1>");
        response.end();
      } else {
        response.writeHead(200, {
          "content-type": "text/html",
        });
        response.end(data);
      }
    }
  );
};
module.exports = homeHandler;
