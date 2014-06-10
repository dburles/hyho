Responses = new Meteor.Collection('responses');

if (Meteor.isServer) {
  Meteor.methods({
    response: function(itemId, response) {
      if (! this.userId)
        return;

      if (response === 'yes')
        response = 1;
      else if (response === 'no')
        response = 0;
      else
        return;

      var item = Items.findOne(itemId);

      if (! item)
        return;

      var existingResponse = Responses.findOne({ userId: this.userId, itemId: itemId });

      if (existingResponse)
        return;

      Responses.insert({
        userId: Meteor.userId(),
        itemId: itemId,
        createdAt: Date.now(),
        response: response
      });
    }
  });
}

Responses.helpers({
  item: function() {
    return Items.findOne(this.itemId);
  },
  myResponse: function() {
    return this.response ? 'Yes' : 'No';
  }
});