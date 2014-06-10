Items = new Meteor.Collection('items');

Items.helpers({
  response: function() {
    return Responses.findOne({ userId: Meteor.userId(), itemId: this._id });
  },
  url: function() {
    return 'http://en.wikipedia.org/wiki?curid=' + this.pageid;
  }
});