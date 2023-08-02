const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;
const path = require("path");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

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
const reactPath = path.resolve("../client/build");
const url =
  "https://api.github.com/repos/blockapps/strato-getting-started/releases/tags/";

app.use(cors(corsOptions));

app.use(express.static(reactPath));

app.get("/", function (req, res) {
  res.sendFile(reactPath);
});

app.get("/release", (req, res) => {
  let tagName = req.query.tagName;

  if (tagName == null || !tagName.trim()) {
    let response = res
      .status(400)
      .send(
        createResponseObj(null, "Please enter a tag name.", null, null).result
      );
  } else {
    console.log(`Fetching release data for tag ${tagName}`);
    getReleaseDateByTagName(tagName)
      .then(({ statusCode, result }) => {
        res.status(statusCode).send(result);
      })
      .catch((err) => {
        console.log(
          `Something went wrong with request for tag ${tagName}. Error: ${err}`
        );
        res
          .status(500)
          .send(
            createResponseObj(
              null,
              "Something went wrong. Please try again later",
              500,
              null
            )
          );
      });
  }
});

app.listen(port, () => {
  console.log(`BlockApps Release Tag API listening on port ${port}`);
});

const createResponseObj = (creationDate, errorMsg, statusCode) => {
  return {
    statusCode,
    result: {
      creationDate,
      errorMsg,
    },
  };
};

const getReleaseDateByTagName = (tagName) => {
  return new Promise((resolve, reject) => {
    fetch(url.concat(tagName))
      .then((res) => {
        res.json().then((response) => {
          if (res.status == 200) {
            let formattedDate = dateFormatter.format(
              new Date(response["created_at"])
            );
            resolve(createResponseObj(formattedDate, null, res.status));
          } else if (res.status == 404) {
            resolve(createResponseObj(null, "Tag not found.", res.status));
          } else {
            resolve(createResponseObj(null, res.statusText, res.status));
          }
        });
      })
      .catch((err) => reject(err));
  });
};
