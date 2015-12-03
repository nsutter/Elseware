module.exports = function(models, bookshelf) {
  var Event = bookshelf.Model.extend({
    tableName: 'event'
  });

  return Event;
};
