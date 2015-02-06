var config = function () {

  var twitter = {
    service: {
      appdirect: '@AppDirect',
      laughingsquid: '@laughingsquid',
      techcrunch: '@techcrunch'
    },
    options: {
      limit: 30
    },
    url: 'http://localhost:4000/tweets',
    oauth: {
      consumerKey: "dQhpyFiW8KnUftwGEGr5nQGDG",
      consumerSecret: "SQspxKcvz6yimll1qvuJaPIcOAXVena9tQC7wh8yzO7MnLGcVx",
      callbackURL: "http://localhost:3000/auth/twitter/callback",
      accessToken: "3011393950-Qg7jlSD4Q5yjvSk4ocxTV3JSOmKfky6Zzb89ZjB",
      accessTokenSecret: "fYvVl1gzLmyA1czXgK87WLgljlaL7vmTG86cmpq2PRvH8"
    }
  };

  return {
    twitter: twitter
  };

};

module.exports = config;
