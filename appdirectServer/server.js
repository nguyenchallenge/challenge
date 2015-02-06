var restify = require('restify');
var Twit    = require('twit');
var async   = require('async');
var cache   = require('memory-cache');
var config  = require('./config/config')();

var ip_addr   = '127.0.0.1',
    path      = "/tweets",
    tweetsObj = {},
    cache,
    t;

var server = restify.createServer({
    name : "appdirect"
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get({path : path , version : '0.0.1'} , getTweets);


function initialize () {
  t = new Twit({
    consumer_key: config.twitter.oauth.consumerKey,
    consumer_secret: config.twitter.oauth.consumerSecret,
    access_token: config.twitter.oauth.accessToken,
    access_token_secret: config.twitter.oauth.accessTokenSecret
  });
}

function getTweets(req, res, next){
  res.setHeader('Access-Control-Allow-Origin','*');

  if (!cache.get('tweets')) {

    async.parallel([
        function(next){
          getTweetsByHashTag(config.twitter.service.appdirect, function(err, data) {
            if (err) return next(err);
            next();
          });
        },
        function(next){
          getTweetsByHashTag(config.twitter.service.laughingsquid, function(err, data) {
            if (err) return next(err);
            next();
          });
        },
        function(next){
          getTweetsByHashTag(config.twitter.service.techcrunch, function(err, data) {
            if (err) return next(err);
            next();
          });
        }
    ], function (err) {
        cache.put('tweets', tweetsObj, config.twitter.options.cachetime);
        res.send(200 , tweetsObj);
        return next();
    });
  } else {
    res.send(200, cache.get('tweets'));
    return next();
  }
}

function getTweetsByHashTag (hashtag, next) {
  t.get('search/tweets', { q: '@' + hashtag, count: 30 }, function(err, data, response) {
    console.log(hashtag, data);
    data.name = hashtag;
    tweetsObj[hashtag] = data;
    if (err) {
      return next(err);
    }
    return next(null, data);
  });
}

server.listen(process.env.PORT || 4000, function(){
  console.log('%s listening at %s ', server.name , server.url);
  initialize();
});
