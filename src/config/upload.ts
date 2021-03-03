import multer from "multer";
import path from "path";

const tempFolder = path.resolve(__dirname, "..", "..", "temp");

export default {
  directory: tempFolder,
  uploadsFolder: path.resolve(tempFolder, "uploads"),
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const hash = Math.floor(Math.random() * 230957329075);
      const filename = `${hash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
