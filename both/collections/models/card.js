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

//inset meteor method
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
  run: function( doc ) {
      doc.createdBy = Meteor.userId()
      Card.collection.insert(doc);
    },
});

//update meteor method
Card.meteorMethods.updateCard = new ValidatedMethod ({
  name: "Card.meteorMethods.updateCard",
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    message: 'You need to be logged in to call this method',
    reason: 'You need to login'
  },
  validate: function(){
    return Card.schema.validator();
  },
  run: function( doc ){
    var documentId = doc._id;
    var modifier = doc.modifier;
    var callbackResponse = {
      toastrTitle:"success",toastrMessage:"Card Updated"
    };
    if ( ! this.isSimulation) {
      var realThing = Card.collection.findOne(
        documentId,
        { fields: { "createdBy": 1, _id: 1 }}
      );
      if (realThing.createdBy !== Meteor.userId()) {
         throw new Meteor.Error("access denied", "can only edit if you made it");
      }
    Card.collection.update(documentId, modifier);
        return callbackResponse;
    }
  },
});

//delete meteor method
Card.meteorMethods.deleteCard = new ValidatedMethod ({
  name: "Card.meteorMethods.deleteCard",
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    message: 'You need to be logged in to delete this card',
    reason: 'You need to login'
  },
  validate: function(){
    return Card.schema.validator();
  },
  run: function( doc ){
    var documentId = doc._id;
    var modifier = doc.modifier;
    var callbackResponse = {
      toastrTitle:"success",toastrMessage:"Card Deleted"
    };
    if ( ! this.isSimulation) {
      var realThing = Card.collection.findOne(
        documentId,
        { fields: { "createdBy": 1, _id: 1 }}
      );
      if (realThing.createdBy !== Meteor.userId()) {
         throw new Meteor.Error("access denied", "can only edit if you made it");
      }
    Card.collection.remove(documentId);
        return callbackResponse;
    }
  },
});

Card.methods({
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
