Meteor.methods({
  // XXX: for testing
  getRandWiki2: function() {
    var items = Items.find().fetch();
    return Random.choice(items)._id;
  },
  getRandWiki: function() {
    try {
      var result = HTTP.get('http://en.wikipedia.org/w/api.php', {
        query: 'action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json'
      });

      var obj = _.reduce(result.data.query.pages, function(page) { return page; });

      // extract: "<p>The <b>Vought-Sikorsky VS-300</b> was a single-engine helicop..."
      // ns: 0
      // pageid: 4009559
      // title: "Vought-Sikorsky VS-300"

      var insert = Items.upsert({ pageid: obj.pageid }, {
        $set: {
          pageid: obj.pageid,
          title: obj.title,
          extract: obj.extract
        }
      });

      // console.log(result);
      // console.log(obj);

      var item = Items.findOne(insert.insertedId);
      // console.log('item', item);

      return item._id;

    } catch (error) {
      throw new Meteor.Error(500, error.message);
    }
  }
});