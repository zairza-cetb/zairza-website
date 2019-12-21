var express = require('express');
var router = express.Router();
var json = require('./data.json')

// need 4 elements from the json array in blog.ejs file
let data = []

for (let i=0; i<=3; i++) {
  let release = json[i].release

  data.push({
    title: json[i].title,
    href: json[i].href,
    author: json[i].author,
    release: json[i].release.split("T")[0].replace('/-/g', '/'),
    cover: json[i].cover
  })
}

/* GET home page. */
router.get('/', function(req, res) {
  console.log("check")
  res.render('index', {data: data});
});


module.exports = router;
