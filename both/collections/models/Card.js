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
    console.log(doc);
    console.log(doc._id);
    //there is no doc._id
    //how to search for the current thing
    var documentId = doc._id;
    console.log('both');
      console.log('!isSimulation ' + !this.isSimulation);
    if ( ! this.isSimulation) {
    // console.log('Meteor.isServer ' + Meteor.isServer);
    if(Meteor.isServer){
      console.log(Meteor.userId());
      console.log('servercode');
      console.log(Meteor.userId()+" Meteor.userId()");
      var realThing = Card.find(
        documentId
        // ,
        // { fields:
        //   {
        //     "createdBy": 1
        //   ,
        //   _id: 1
        //   }
        // }
      );
      console.log('realThing');
      console.log(realThing);
      let realOwnersId = realThing.attributes({pick: ['createdBy']}) === {
        createdBy: Meteor.userId()
      };
      console.log(realOwnersId + " realOwnersId");
      // console.log(realThing.createdBy + "realThing.createdBy");
      // console.log(realThing._deps.createdBy + "realThing._deps.createdBy");

      //model object has a createdBy property that is being used for the search
      console.log(Meteor.userId());
      if (realOwnersId !== Meteor.userId()) {
        throw new Meteor.Error("access denied", "can only edit if you made it");
        console.log('realThing.createdBy ' + realThing.createdBy);
        console.log('Meteor.userId() ' + Meteor.userId());
      }else {
        console.log('realThing.createdBy === Meteor.userId()');
      }

      // console.log(realThing);
      console.log('stuff');
      realThing.update(doc);

      var callbackResponse = {
        toastrTitle:"success",toastrMessage:"Card Updated"
      };
      return callbackResponse;
    }
    }
    //is a simulation
    else {
      console.log(this);
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
