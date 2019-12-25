// The scraper for the blog.ejs section in the application. 
// The source for scraping is:  https://blog.zairza.in/

// Things we need from the website: 
// clickable cover image with blog link
// date published in DD/MM/YYYY format
// title of the blog post
// author of the blog post

const express = require("express");
const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");

const app = express();


app.get("/scrape", function (req, res) {

    // set the main page url
    url = "https://blog.zairza.in/"

    // scraped data is stored here
    let data = []

    // make request to the to be scraped website through request
    request(url, function (error, response, html) {
        // check if any errors

        if (!error) {
            // whole scraping code will be inside this block

            let $ = cheerio.load(html);

            // Declare variables to capture:
            // TODO: SCRAPE: covers, releases, titles, authors

            let title, href, author, release;

            // make constructor function blog
            const Blog = function (title, href, author, release, cover) {
                this.title = title
                this.href = href
                this.author = author
                this.release = release
            }

            $(".postArticle--short").filter(function () {

                let i = 1

                while (i <= 1) {
                    title = $(this).find("h3").text()
                    href = $(this).find(".u-clearfix").next("a").attr("href")
                    author = $(this).find(".postMetaInline-authorLockup").children().first().text()
                    release = $(this).find("time").attr("datetime")

                    const newBlog = new Blog(title, href, author, release)

                    data.push({
                        "title": newBlog.title,
                        "href": newBlog.href,
                        "author": newBlog.author,
                        "release": newBlog.release
                    })

                    // continuation of loop
                    i += 1
                }
            })

            // This scrapes the one latest blog post
            $(".u-paddingTop30").filter(function () {

                title = $(this).find("h3").first().text()
                href = $(this).find(".u-borderLighter").attr("href")
                author = $(this).find(".u-flexCenter").children().last().children().first().text()
                release = $(this).find("time").attr("datetime")

                data.unshift({
                    "title": title,
                    "href": href,
                    "author": author,
                    "release": release
                })
            })

            // Add data array into a json file
            fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
                if (err) {
                    console.log(err)
                }
            });
        }

    // TODO: scraper for cover image from individual blog post

    let count = 0
    let finalFourUrl = []

    while (count < 4) {

        // set url for the cover image
        coverURL = data[count].href

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

        finalFourUrl.push({
            "img": newCover.cover
        })


        fs.writeFile("cover.json", JSON.stringify(finalFourUrl, null, 4), function (err) {
            if (err) {
                console.log(err)
            }
        })

    })

    count++
    // while loop ends
    }

    })

});

app.listen(3000, function () {
    console.log("Magic happens at port 3000")
});