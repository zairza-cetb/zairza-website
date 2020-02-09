// The scraper for the blog.ejs section in the application.
// The source for scraping is:  https://blog.zairza.in/

// Things we need from the website:
// clickable cover image with blog link
// date published in DD/MM/YYYY format
// title of the blog post
// author of the blog post

const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");

function main() {
    let start = 0;

    const index = () => {
        start++;
        return start;
    };

    const scrape = (req, res) => {
        // set the main page url
        url = "https://blog.zairza.in/";

        // scraped data is stored here before pushing to data.json
        let data = [];

        // make request to the to be scraped website through request
        request(url, function(error, response, html) {
            // check if any errors

            if (!error) {
                // whole scraping code will be inside this block

                let $ = cheerio.load(html);

                // Declare variables to capture:
                // TODO: SCRAPE: covers, releases, titles, authors

                let id, title, href, author, release;

                // make constructor function blog
                const Blog = function(id, title, href, author, release) {
                    this.id = id;
                    this.title = title;
                    this.href = href;
                    this.author = author;
                    this.release = release;
                };

                $(".postArticle--short").filter(function() {
                    let i = 1;

                    while (i <= 1) {
                        id = index();
                        title = $(this)
                            .find("h3")
                            .text();
                        href = $(this)
                            .find(".u-clearfix")
                            .next("a")
                            .attr("href");
                        author = $(this)
                            .find(".postMetaInline-authorLockup")
                            .children()
                            .first()
                            .text();
                        release = $(this)
                            .find("time")
                            .attr("datetime");

                        const newBlog = new Blog(
                            id,
                            title,
                            href,
                            author,
                            release
                        );

                        data.push({
                            id: newBlog.id,
                            title: newBlog.title,
                            href: newBlog.href,
                            author: newBlog.author,
                            release: newBlog.release
                        });
                        // continuation of loop
                        i += 1;
                    }
                });

                // This scrapes the one latest blog post
                $(".u-paddingTop30").filter(function() {
                    id = 0;
                    title = $(this)
                        .find("h3")
                        .first()
                        .text();
                    href = $(this)
                        .find(".u-borderLighter")
                        .attr("href");
                    author = $(this)
                        .find(".u-flexCenter")
                        .children()
                        .last()
                        .children()
                        .first()
                        .text();
                    release = $(this)
                        .find("time")
                        .attr("datetime");

                    data.unshift({
                        id,
                        title: title,
                        href: href,
                        author: author,
                        release: release
                    });
                });

                // Add data array into a json file
                fs.writeFile(
                    __dirname + "/../json/data.json",
                    JSON.stringify(data, null, 4),
                    function(err) {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
            }
        });
    };

    let count = 0,
        finalFourImgUrl = [],
        bloglinks = [];

    // This brings first four urls from data.json to bloglinks (array)

    try {
        const jsonData = require("../json/data.json");
        // console.log(jsonData);
        for (let i = 0; i <= 3; i++) {
            let link = jsonData[i].href;
            let blogTitle = jsonData[i].title;
            let id = jsonData[i].id;
            bloglinks.push({
                id: id,
                title: blogTitle,
                link: link
            });
        }
    } catch (error) {
        console.error(
            "An error occured while fetching urls from data.json"
            // error
        );
    }

    try {
        const scrapcover = (req, res) => {
            while (count < 4) {
                // getting link of cover page which is to be scraped
                let eachblogobject = bloglinks[count];

                let coverData = []; // stores img link returned after scraping

                request(eachblogobject.link, function(error, response, html) {
                    if (!error) {
                        let $ = cheerio.load(html);

                        // Declaring variables to scrape
                        let coverLink;

                        const Cover = function(id, cover, blogTitle) {
                            this.id = id;
                            this.cover = cover;
                            this.blogTitle = blogTitle;
                        };

                        $(".paragraph-image")
                            .closest("figure")
                            .filter(function() {
                                let element = $(this)
                                    .find("noscript")
                                    .html();
                                let imgsrc = $(element).attr("src");

                                coverData.push(imgsrc);
                            });

                        newCover = new Cover(
                            eachblogobject.id,
                            coverData[0],
                            eachblogobject.title
                        );
                    }

                    finalFourImgUrl.push({
                        id: newCover.id,
                        title: newCover.blogTitle,
                        img: newCover.cover
                    });

                    fs.writeFile(
                        __dirname + "/../json/cover.json",
                        JSON.stringify(finalFourImgUrl, null, 4),
                        function(err) {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );
                });

                count++;
                // while loop ends
            }
        };

        try {
            scrapcover();
        } catch (error) {
            console.log(
                "An error occured while calling the scrapcover function"
            );
        }
    } catch (error) {
        console.log("An error occured inside scrapcover function");
    }

    // This block sorts the cover.json according to id no.
    const sortCover = () => {
        let coverData = require("../json/cover.json");

        let i = 0,
            j = 0,
            sortedArray = [];

        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                if (coverData[j].id === i) {
                    sortedArray.push(coverData[j]);
                    break;
                }
            }
        }

        // now sortedArray is ready to push json file

        // Add data array into a json file
        fs.writeFile(
            __dirname + "/../json/coversorted.json",
            JSON.stringify(sortedArray, null, 4),
            function(err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    };

    sortCover();
    scrape();
}

module.exports = main;

// try {
//     main();
// } catch (error) {
//     console.error("Error occured while calling main function");
// }
