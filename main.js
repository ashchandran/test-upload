var express = require('express')
var app = express()
var path = require("path")
var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

app.use('/', express.static(__dirname));
app.use("/fine-upload", express.static(path.join(__dirname, "node_modules/fine-uploader/fine-uploader")));

app.get('/hello', function (req, res) {
  res.send('Hello World!')
});

app.post("/upload", upload.single('qqfile'), function (req, res) {
    console.log(req.file);
    res.json({"msg":"hey", "buffer": req.file.buffer});
})

app.listen(process.env.PORT || 3000, function () {
  console.log('App running')
});