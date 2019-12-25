// This file is reponsible for scraping the cover image from each individual blogs.accordion

// TODO: scraper for cover image from individual blog post

const express = require("express");
const fs = require("fs");
const cheerio = require("cheerio")
const request = require("request")
const json = require("./json/data.json")

const app = express();

let count = 0
let finalFourUrl = []
let bloglinks = []

// This brings first four urls from data.json to bloglinks (array)

for (let i = 0; i <= 3; i++) {

    let coverlink = json[i].href
    bloglinks.push(coverlink)

}


app.get("/scrapcover", function (req, res) {

    while (count < 4) {

        // set url for the cover image
        let coverURL = json[count].href
        console.log(coverURL)

        let coverData = []

        request(coverURL, function (error, response, html) {

            if (!error) {

                let $ = cheerio.load(html)

                // Declaring variables to scrape
                let coverLink

                const Cover = function (cover) {
                    this.cover = cover
                }

                $(".paragraph-image").closest("figure").filter(function () {

                    let element = $(this).find("noscript").html()
                    let imgsrc = $(element).attr("src")

                    coverData.push(imgsrc)

                })

                newCover = new Cover(coverData[0])

            }

            finalFourUrl.unshift({
                "img": newCover.cover
            })


            fs.writeFile(__dirname + "/../routes/json/cover.json", JSON.stringify(finalFourUrl, null, 4), function (err) {
                if (err) {
                    console.log(err)
                }
            })

        })

        count++
        // while loop ends
    }


})


app.listen("3000", function () {
    console.log("Magic happens on port 3000")
})


