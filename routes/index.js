const express = require('express');
const router = express.Router();
const moment = require("moment")
const json = require('./data.json')

// need 4 elements from the json array in blog.ejs file
let ejsRenderedData = []

for (let i=0; i<=3; i++) {

  let date = moment(json[i].release)

  ejsRenderedData.push({
    title: json[i].title,
    href: json[i].href,
    author: json[i].author,
    release: date.format("DD/MM/YYYY"),
    cover: json[i].cover
  })
}

/* GET home page. */
router.get('/', function(req, res) {
  console.log("check")
  res.render('index', { ejsRenderedData: ejsRenderedData });
});


module.exports = router;
