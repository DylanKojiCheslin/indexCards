Card = class Card extends SmartModel{
  static schema() {
    return {
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
    }
  }

  get hasMany() {
    return {
      tags: {}
    }
  }

};

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
  validate: function(doc){
    new SimpleSchema(
      Card.schema()
    ).validator(doc);
  },
  run: function( doc ) {
    if (! this.isSimulation) {
      if(Meteor.isServer){
        console.log(Meteor.userId());
      doc.createdBy = Meteor.userId();
      console.log(Meteor.userId());
      console.log(doc);
      Card.create(doc);
      }
    }
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
  validate: function(doc){
    new SimpleSchema(
      Card.schema()
    ).validator(doc);
  },
  run: function( doc ){
    var documentId = doc._id;
    if ( ! this.isSimulation) {
      if(Meteor.isServer){
        var realThing = Card.find(
          {'question': doc.question,'answer': doc.answer}
        );
        realThing.update(doc);

        var callbackResponse = {
          toastrTitle:"success",toastrMessage:"Card Updated"
        };
        return callbackResponse;
      }
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
  validate: function(doc){
    new SimpleSchema(
      Card.schema()
    ).validator(doc);
  },
  run: function( doc ){
    var documentId = doc._id;
    var modifier = doc.modifier;
    if ( ! this.isSimulation) {
      var realThing = Card.find(
        documentId,
        { fields: { "createdBy": 1, _id: 1 }}
      );
      if (realThing.createdBy !== Meteor.userId()) {
        throw new Meteor.Error("access denied", "can only edit if you made it");
      }
      Card.remove(documentId);

      var callbackResponse = {
        toastrTitle:"success",toastrMessage:"Card Deleted"
      };
      return callbackResponse;
    }
  },
});

Card.allow({
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
