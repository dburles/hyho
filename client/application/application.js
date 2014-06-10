getRandomWiki = function() {
  Meteor.call('getRandWiki', function(error, response) {
    if (error)
      return console.log(error);

    // console.log(response);

    Session.set('currentItemId', response);
    Session.set('responseLoading', false);
  });
};