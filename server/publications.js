Meteor.publishAuth = function(name, fn) {
  Meteor.publish(name, function() {
    if (! this.userId)
      return this.ready();
    
    return fn.apply(this, arguments);
  });
};

Meteor.publishAuth('item', function(_id) {
  check(_id, String);
  return Items.find(_id);
});

Meteor.publishAuth('userResponse', function(itemId) {
  check(itemId, String);
  return Responses.find({ userId: this.userId, itemId: itemId });
});

Meteor.publishAuth('myResponses', function() {
  var responses = Responses.find({ userId: this.userId });
  return [
    responses,
    Items.find({ _id: { $in: responses.map(function(doc) { return doc.itemId; }) }})
  ];
});