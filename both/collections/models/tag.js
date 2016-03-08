Tag = ManyModel.extendAndSetupCollection("tag");

Tag.schema = new SimpleSchema({
  "text":{
    type: String,
  },
});

Tag.appendSchema(Tag.schema);

Tag.meteorMethods = {};

var linkSchema = new SimpleSchema({
  cardId: { type: SimpleSchema.RegEx.Id },
  tagId: { type: SimpleSchema.RegEx.Id }
});

//inset meteor method
Tag.meteorMethods.insertTag = new ValidatedMethod ({
  name: "Tag.meteorMethods.insertTag",
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'You need to login',
    message: 'You need to be logged in to call Tag.insertTag',
  },
  validate: function(){
      return Card.schema.validator();
    },
  run: function( doc ) {
      Tag.collection.insert(doc);
    },
});


//link to card
Tag.meteorMethods.linkToCard = new ValidatedMethod({
  name : "Tag.meteorMethods.linkToCard",
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    message: 'You need to be logged in to call Tag.linkToCard',
    reason: 'You need to login'
  },
  validate: function(){
    return linkSchema.validator()
  },
  run: function ( cardId,  tagId ) {
    if ( ! this.isSimulation ) {
      //find this find this tag
      var thisTag = Tag.collection.findOne({ _id : tagId });
      //link from tag to card
      if ( thisTag ) {
        thisTag.linkCard( cardId );
      }
    }
  }
})

Tag.meteorMethods.checkExists = new ValidatedMethod ({
  name: "Tag.meteorMethods.checkExists",
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    message: 'You need to be logged in to call Tag.checkExists',
    reason: 'You need to login'
  },
  validate: function(){
      return Tag.schema.validator();
    },
    //this would be better as a static method of a class
    //how to do this as a ValidatedMethod
  run: function( tag ) {
    if ( ! this.isSimulation) {
      var tagExists = Tag.collection.findOne({"text": tag});
      if (tagExists) {
        return tagExists._id;
      }
    }
  }
});
