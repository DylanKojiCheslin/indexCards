Tag = ManyModel.extendAndSetupCollection("tag");

Tag.schema = new SimpleSchema({
  "text":{
    type: String,
  },
});

Tag.appendSchema(Tag.schema);

Tag.meteorMethods = {};

Tag.meteorMethods.checkExists = new ValidatedMethod ({
  name: "Tag.meteorMethods.checkExists",
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    message: 'You need to be logged in to call this method',
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
