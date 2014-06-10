Session.setDefault('responseLoading', false);

Template.layout.events({
  // 'click a.get': function(event) {
  //   event.preventDefault();
  //   getOne();
  // },
  'click a.response': function(event) {
    event.preventDefault();

    var response = $(event.target).data('response');
    Session.set('responseLoading', true);

    Meteor.call('response', Session.get('currentItemId'), response, function() {
      getRandomWiki();
    });
  },
  'click .next': function(event) {
    event.preventDefault();
    getRandomWiki();
  }
});

Template.main.helpers({
  currentItem: function() {
    return Items.findOne(Session.get('currentItemId'));
  },
  responseLoading: function() {
    return Session.get('responseLoading');
  }
});
