Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404'
});

if (Meteor.isClient) {
  Router.onBeforeAction('loading', { except: ['main'] });
  Router.onBeforeAction('dataNotFound', { except: ['main'] });
}

Router.map(function() {
  this.route('main', { path: '/' });
  this.route('myResponses', { path: '/my-responses' });
});

MainController = RouteController.extend({
  onRun: function() {
    if (! Session.get('currentItemId'))
      getRandomWiki();
  },
  waitOn: function() {
    return [
      Meteor.subscribe('item', Session.get('currentItemId')),
      Meteor.subscribe('userResponse', Session.get('currentItemId'))
    ];
  }
});

MyResponsesController = RouteController.extend({
  waitOn: function() {
    return Meteor.subscribe('myResponses');
  },
  data: function() {
    return {
      responses: Responses.find({ userId: Meteor.userId() }, { sort: { createdAt: -1 }})
    };
  }
});