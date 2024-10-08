const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    setHeaders: (res, path, stat) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
      res.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    },
  })
);

app.use(express.json());

// Endpoint to handle query parameters for the Victoria and Albert Museum API

app.get("/search", async (req, res) => {
  const queryParams = new URLSearchParams(req.query).toString();
  const url = `https://api.vam.ac.uk/v2/objects/search?${encodeURI(
    queryParams
  )}`;
  try {
    const response = await axios.get(
      `https://api.vam.ac.uk/v2/objects/search?${queryParams}`
    );

    //response.data has two keys - info and records
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .send(
        "Internal server error: " +
          (error.response ? error.response.data : error.message)
      );
  }
});

// Endpoint to handle the object ID for the Victoria and Albert Museum API
app.get("/object/:objectId", async (req, res) => {
  const { objectId } = req.params;
  try {
    const response = await axios.get(
      `https://api.vam.ac.uk/v2/museumobject/${objectId}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .send(
        "Internal server error: " +
          (error.response ? error.response.data : error.message)
      );
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
