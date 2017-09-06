var express = require('express');
var bodyParser = require('body-parser');
var promoRouter = express.Router();
var mongoose = require('mongoose');
var Verify = require('./verify');

var Promotions = require('../models/promotions');

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.get(function(req,res,next){
  Promotions.find(req.query, function (err, promo) {
      if (err) return next(err);
      res.json(promo);
  });

})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Promotions.create(req.body, function (err, promo) {
      if (err) return next(err);
      console.log('Promo created!');
      var id = promo._id;

      res.writeHead(200, {
          'Content-Type': 'text/plain'
      });
      res.end('Added the promo with id: ' + id);
  });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next){
  Promotions.remove({}, function (err, resp) {
      if (err) return next(err);
      res.json(resp);
  });
});

promoRouter.route('/:promoId')

.get(function(req,res,next){
  Promotions.findById(req.params.promoId, function (err, promo) {
      if (err) return next(err);
      res.json(promo);
  });

})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Promotions.findByIdAndUpdate(req.params.promoId, {
      $set: req.body
  }, {
      new: true
  }, function (err, promo) {
      if (err) return next(err);
      res.json(promo);
  });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Promotions.findByIdAndRemove(req.params.promoId, function (err, resp) {        if (err) return next(err);
      res.json(resp);
  });
});
module.exports=promoRouter;