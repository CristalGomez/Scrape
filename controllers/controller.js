var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("../models");

var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/save", function (req, res) {
        Article.find({}, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                var hbsArticleObject = {
                    articles: doc
                };
                res.render("save", hbsArticleObject);
            }
        });
    });

    // app.post("/scrape", function (req, res) {
    //     request("https://www.chron.com/", function (error, response, html) {
    //         var $ = cheerio.load(html);
    //         var scrapedArticles = {};
    //         $("h4").each(function (i, element) {
    //             var result = {};
    //             result.title = $(this).children("a").text();
    //             console.log("Title from results: " + result.title);
    //             result.link = $(this).children("a").attr("href");
    //             scrapedArticles[i] = result;
    //         });
    //         console.log("Scraped Articles: " + scrapedArticles);
    //         var hbsArticleObject = {
    //             articles: scrapedArticles
    //         };
    //         res.render("index", hbsArticleObject);
    //     });
    // });

    // app.post("/save", function (req, res) {
    //     console.log("Title: " + req.body.title);
    //     var newArticleObject = {};

    //     newArticleObject.title = req.body.title;
    //     newArticleObject.link = req.body.link;
    //     var entry = new Article(newArticleObject);
    //     console.log("Save Articles: " + entry);
    //     entry.save(function (err, doc) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else {
    //             console.log(doc);
    //         }
    //     });
    //     res.redirect("/save");
    // });


    app.get("/delete/:id", function (req, res) {
        console.log("Delete function is ready.");
        Article.findOneAndRemove({ "_id": req.params.id }, function (err, offer) {
            if (err) {
                console.log("Not able to delete:" + err);
            } else {
                console.log("Able to delete, Yay");
            }
            res.redirect("/save");
        });
    });


    app.get("/notes/:id", function (req, res) {

        console.log("Delete function ready.");
        Note.findOneAndRemove({ "_id": req.params.id }, function (err, doc) {
            if (err) {
                console.log("Not able to delete:" + err);
            } else {
                console.log("Able to delete, Yay");
            }
            res.send(doc);
        });
    });


    // grab an article by ObjectId
    app.get("/articles/:id", function (req, res) {

        Article.findOne({ "_id": req.params.id })
            .populate('notes')
            .exec(function (err, doc) {
                if (err) {
                    console.log("Not able to find article and get notes.");
                }
                else {
                    console.log("We are getting article and maybe notes? " + doc);
                    res.json(doc);
                }
            });
    });


    // create or replace existing notes
    // app.post("/articles/:id", function (req, res) {
    //     // create new note then pass req.body for the entry
    //     // var newNote = new Note(req.body);
    //     // newNote.save(function (error, doc) {
    //     //     if (error) {
    //     //         console.log(error);
    //     //     }
    //     //     else {
    //     //         Article.findOneAndUpdate({ "_id": req.params.id }, { $push: { notes: doc._id } }, { new: true, upsert: true })
    //     //             .populate('notes')
    //     //             .exec(function (err, doc) {
    //     //                 if (err) {
    //     //                     console.log("Cannot find article.");
    //     //                 } else {
    //     //                     console.log("On note save we are getting notes? " + doc.notes);
    //     //                     res.send(doc);
    //     //                 }
    //     //             });
    //     //     }
    //     // });
    // });


}

