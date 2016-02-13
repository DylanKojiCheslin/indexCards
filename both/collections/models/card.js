Card = ManyModel.extendAndSetupCollection("card");

Card.schema = new SimpleSchema({
  "question":{
    type: String,
  },
  "answer":{
    type: String,
  },
  "difficulty":{
    type: Number,
  },
  "createdBy":{
    type: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      type: "hidden",
    },
  },
});

Card.appendSchema(Card.schema);

Card.meteorMethods = {};

Card.meteorMethods.insertCard = new ValidatedMethod ({
  name: "Card.meteorMethods.insertCard",
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    message: 'You need to be logged in to call this method',
    reason: 'You need to login'
  },
  validate: function(){
      return Card.schema.validator();
    },
  run: function( stuff ) {
      Card.collection.insert(stuff);
    },
});

Card.meteorMethods.updateCard = new ValidatedMethod ({
  name: "Card.meteorMethods.updateCard",
  validate: function(){
    return Card.schema.validator();
  },
  run: function( stuff ){
    var documentId = stuff._id;
    var modifier = stuff.modifier;
    var callbackResponse = {
      toastrTitle:"success",toastrMessage:"Card Updated"
    };
    Card.collection.update(documentId, modifier);
        return callbackResponse;
  },
});

Card.collection.allow({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }
});
