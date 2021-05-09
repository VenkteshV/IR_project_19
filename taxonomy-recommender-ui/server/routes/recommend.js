const express = require('express');
const router = express.Router();
const request = require('request-promise');
const bodyParser = require('body-parser');
const IncomingForm = require("formidable").IncomingForm;
const FormData = require('form-data')
const multer = require('multer');

upload = multer({storage: multer.memoryStorage()})

const jsonParser = bodyParser.json();


router.post('/extract', upload.any(), function (req, res) {
  let requestObject = {};
  console.log("here")
  var form = IncomingForm();
  // requestObject['headers'] = {
  //   'Content-Type': 'application/json',
  //   'Authorization': 'c2VydmljaW5nZ3JhcGhxbDpzZXJ2aWNpbmdncmFwaHFsQDEyMw==',
  // };
  // form = IncomingForm()

  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  requestObject['headers'] = {
    'content-type': 'multipart/form-data',
  };

  requestObject['url'] = `http://localhost:5000/recommendtaxonomy`;
  fileObject = {}
  // let formData = new FormData()
  // console.log("*********",req.file)

  // formData.append("document", req.file.buffer, req.file.originalname)
  // console.log("*******************", formData)
  requestObject["formData"] = req.files;

  // form.parse(req, (err, fields, files) => {
  //   console.log("here***********", files)
  //   formData.append("document", files["document"])
  //   requestObject["formData"] = formData



  // })

  request.post(requestObject)
  .then(
    (response) => res.json(JSON.parse(response))
  ).catch(
    (err) => {
      res.status(err.statusCode).json(err.message)
      console.log('error', err);
    }
  );

  console.log('requestObject', requestObject);


});



module.exports = router;
