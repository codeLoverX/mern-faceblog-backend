import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerUpload = multer({
  storage: storage,
}).any()
// both files and fields
// fields([({name: 'selectedFile', name: "audio", name: "video", name: "message"})]);

export {
  multerUpload
};
