const express = require("express");
const axios = require("axios");
// create express app
const app = express();

async function getData(params) {
  const { endPoint, header } = params;
  try {
    const response = await axios
      .get(endPoint, header)
      .then((resp) => {
        return resp.data;
      })
      .catch((e) => {
        console.log(e);
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}

app.get("/", async function (req, res) {
  // Add the queries to the github Jobs API call
  let q = "";
  const entries = Object.entries(req.query);
  for (const [key, val] of entries) {
    q = q + `${key}=${val}&`;
  }

  const endPoint = `https://jobs.github.com/positions.json?${q}`;
  const header = { "Content-Type": "application/json" };

  // Since this isn't a site that I want to make public
  // I'll just allow localhost:3000 for CORS issues
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  let data = await getData({ endPoint, header });
  res.send(data);
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
