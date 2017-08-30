var express = require('express');
var db = require("../models");
var router = express.Router();
var Burger = require('../models/')["Burger"];
// Routes
// =============================================================

router.get('/', function(req, res) {
    res.redirect('/index');
});

router.get('/index', function(req, res) {
    db.Burger.findAll({}).then(function(data){

        // Pass the returned data into a Handlebars object and then render it
        var hbsObject = { burgers: data };
        // console.log(data);
        res.render('index', hbsObject);

    })
});
router.post('/burger/create', function (req, res) {
    
      // Sequelize Query to add new burger to database
      db.Burger.create(
        {
          burger_name: req.body.burger_name,
          devoured: false
        }
      ).then(function(){
        // After the burger is added to the database, refresh the page
        res.redirect('/index');
      });
    
});
router.post('/:id', function(req, res) {
    db.Burger.findOne( {where: 
        {
            id: req.params.id
        } 
    }).then(function(burger){
        // ... Update the burger's status to devoured
        burger.update({
            devoured: true,
        }).then(function(){
            res.redirect('/index');
        });
    });
});

router.delete("/:id", function(req, res) {
    db.Burger.destroy( {where: {
                id: req.params.id
            }
        }).then(function() {
            res.redirect('/index');
        });
});

module.exports = router;