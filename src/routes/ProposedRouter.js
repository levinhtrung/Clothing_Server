const express = require("express");
const router = express.Router();
const base64ToImage = require("base64-to-image");
let { PythonShell } = require("python-shell");

router.post("/proposed", (req, res) => {
  try {
    const text = req.body.imageBase64;
    base64ToImage(text.toString(), "my_images/");
    return res.status(200).json({
      status: "OK",
      message: "Chay ok vao day",
    });
  } catch {
    return res.status(404).json({
      message: "loi img",
    });
  }
});

router.get("/results", async (req, res) => {
  const imagee = "my_images/img.jpeg";
  const options = {
    pythonPath: "python3",
    args: [imagee],
  };
  PythonShell.run(
    "/Users/ngockhiem/Documents/Đồ án CDIO 4/Project/model/model.py",
    options,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log("results", results);
        res.json(results);
      }
    }
  );
});
module.exports = router;
