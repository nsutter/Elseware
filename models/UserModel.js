module.exports = function(models, bookshelf) {
  var User = bookshelf.Model.extend({
    tableName: 'users'
  });

  return User;
};
