//'use strict'

var path = process.cwd();
var Url = require('../models/url.js');


module.exports = function (app) {

    app.route('/')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });

    app.route('/new/:id([A-z\d\/\.\:]+)')
    .get(function(req, res) {
        var regex = /^https?:\/\/(.+)/;
        if(regex.test(req.params.id)){
            var shortUrl = '';

            Url.findOne({long_url: req.params.id}, function(err,doc){
                if (doc){
                    config.webhost + base58.encode(doc._id);
                    res.send({'shortUrl': shortUrl});
                }
                else{
                    var newUrl = Url({
                        long_url: req.params.id
                    }); 
                    newUrl.save(function(err) {
                        if(err){
                            console.log(err);
                        }

                        shortUrl = config.webhost + base58.encode(newUrl._id);
                        res.send({'shortUrl': shortUrl});
                    });
                }
            })
        }
        else{
            var nourl = {'error': 'not a valid url'};
            res.send(nourl);
        }
    });




    app.get('/:encoded_id', function(req, res){
      var base58Id = req.params.encoded_id;
      var id = base58.decode(base58Id);

      // check if url already exists in database
      Url.findOne({_id: id}, function (err, doc){
        if (doc) {
          // found an entry in the DB, redirect the user to their destination
          res.redirect(doc.long_url);
        } else {
          res.redirect('not stored url, yet...');
        }
      });

    });


};
