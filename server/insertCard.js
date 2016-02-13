const method = new ValidatedMethod({
  name: 'insertCard',
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'test',
    code: 'notLogged',
    message: 'You need to be logged in to call this method',
    reason: 'You need to login'
  },
  validate(doc) {
    check(doc, Card.collection.simpleSchema());
  },
  run(doc) {
    Card.collection.insert(doc);
  },
});
