var express = require('express');
var cors = require('cors');
require('dotenv').config();
var fileUpload = require('express-fileupload');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Enable files upload
app.use(fileUpload({
  createParentPath: true
}));

// Use body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Post file
app.post("/api/fileanalyse", (req, res) => {
  // Use the "upfile" name from index.html to get updated file
  let myFile = req.files.upfile;

  // Upload file to the "uploads" directory
  myFile.mv("./uploads/" + myFile.name)

  return res.json({
    name: myFile.name,
    type: myFile.mimetype,
    size: myFile.size
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
