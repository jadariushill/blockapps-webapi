const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZoneName: "short",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", options);

const url =
  "https://api.github.com/repos/blockapps/strato-getting-started/releases/tags/";

app.get("/getTagCreationDate", (req, res) => {
  let tagName = req.headers["tag-name"];
  if (tagName == null || !tagName.trim()) {
    res
      .status(400)
      .send({ created_at: null, errorMsg: "Please enter a tag name." });
  } else {
    console.log(`Searching for tag: ${tagName}`);
    getReleaseDate(tagName)
      .then((result) => {
        res.status(result.status).send(result);
      })
      .catch((error) => res.status(error.status ?? 500).send(error));
  }
});

app.listen(port, () => {
  console.log(`BlockApps Release Tag API listening on port ${port}`);
});

function getReleaseDate(tagName) {
  return new Promise((resolve, reject) => {
    fetch(url.concat(tagName))
      .then((res) => {
        if (res.status == 200) {
          res.json().then((resp) =>
            resolve({
              created_at: dateFormatter.format(new Date(resp.created_at)),
              error_msg: null,
              responseStatus: res.status,
            })
          );
        } else if (res.status == 404) {
          resolve({
            created_at: null,
            error_msg: "Release tag name not found!",
            responseStatus: res.status,
          });
        } else {
          reject({
            created_at: null,
            error_msg: "Something went wrong. Please try again later.",
            responseStatus: res.status,
          });
        }
      })
      .catch((err) => reject(err));
  });
}
