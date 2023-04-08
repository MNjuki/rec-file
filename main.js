const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();

// configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res, next) {
  // get the file object from the request
  const file = req.file;

  // read the file contents
  fs.readFile(file.path, function (err, data) {
    if (err) {
      return next(err);
    }

    // write the file to the file system
    fs.writeFile('uploads/' + file.originalname, data, function (err) {
      if (err) {
        return next(err);
      }

      res.json({ message: 'File uploaded successfully' });
    });
  });
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
