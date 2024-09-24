const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Endpoint to handle query parameters for the Victoria and Albert Museum API

app.get("/vam-api/search", async (req, res) => {
  const queryParams = new URLSearchParams(req.query).toString();
  const url = `https://www.vam.ac.uk/api/json/museumobject/search?${queryParams}`;
  console.log(url);
  try {
    const response = await axios.get(
      `https://www.vam.ac.uk/api/json/museumobject/search?${queryParams}`
    );
    //response.data has two keys - info and data
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
