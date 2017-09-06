var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());
favoriteRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.find({postedBy: req.decoded._id})
                .populate('postedBy')
                .populate('dishes')
                .exec(function (err, favorite) {
                if (err) return next(err);
                res.json(favorite);
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){

        Favorites.findOneAndUpdate(
            {postedBy: req.decoded._id},
            {$addToSet: {dishes: req.body._id}},
            {upsert: true, new: true},function (err, favorite){
                if (err) return next(err);
                console.log('Favorite created!');
                res.json(favorite);
            });
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
        Favorites.remove({postedBy: req.decoded._id},function (err, resp) {
                if (err) return next(err);
                res.json(resp);
        });
});

favoriteRouter.route('/:favoriteId')

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
        Favorites.findOneAndUpdate({postedBy: req.decoded._id},
                                    {$pull: {dishes: req.params.favoriteId}},
                                    {new:true},
                                    function (err, resp) {
                if (err) return next(err);

                res.json(resp);
        });
});


module.exports = favoriteRouter;
