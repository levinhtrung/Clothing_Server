// const imageDownloaded = require("image-downloader");
const fs = require("fs");
const multer = require("multer");

const photosMidleware = multer({ dest: "uploads/" });
const chuyenDoiImg = (img, arrImg) => {
  const uploadFiles = [];
  for (let i = 0; i < arrImg.length; i++) {
    const { path, originalname } = arrImg[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.split("\\")[1]);
    // photosMidleware.array("photos", 100);
  }
};


