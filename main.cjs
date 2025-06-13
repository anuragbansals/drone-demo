const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

console.log(__dirname, "zz path");

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle all other routes by sending the React index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.delete("/remove-wp", async (req, res) => {
  try {
    const { filename } = req.query;
    const filePath = `./public/${filename}.json`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err, "error");
        return res.status(500).json({ message: "File could not be deleted" });
      }
    });
    res.json({ message: "Data removed successfully!" });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.delete("/remove-all", async (req, res) => {
  try {
    fs.readdir("./public", (err, files) => {
      if (err) {
        throw new Error("Error: " + err.message);
      } else {
        console.log("\nCurrent directory filenames:", files);
        files.forEach((file) => {
          fs.unlink(`./public/${file}`, (err) => {
            if (err) {
              throw new Error("Error: ", err.message);
            }
          });
        });
      }
    });
    res.json({ message: "Data cleared successfully!" });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.post("/add-wp", async (req, res) => {
  try {
    let jsonData = JSON.stringify(req.body);
    const { filename } = req.query;
    console.log(jsonData);
    fs.appendFile(`./public/${filename}.json`, jsonData, function (response) {
      console.log(response);
    });
    res.send("Success");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
