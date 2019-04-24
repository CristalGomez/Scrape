// Dependencies
var path = require("path");
var express = require("express")


module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function (req, res) {
    console.log("hi")
    res.render("index");
    // return "it works"
  });

  // app.get("/save", function (req, res) {
  //   res.render("save");
  // });


};