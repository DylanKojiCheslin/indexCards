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
  run: function( tag ) {
    if ( ! this.isSimulation) {
      var tagExists = Tag.collection.findOne({"text": tag});
      if (tagExists) {
        return tagExists._id;
      }
      else{
        return false;
      }
    }
  }
});

Meteor.methods({
  check:function( tag ) {
    check(tag, Match.Any);
    console.log(tag);
    if ( ! this.isSimulation) {
      var tagExists = Tag.collection.findOne({text: tag});
      console.log(tagExists);
      if (tagExists) {
        return tagExists._id;
      }
      else{
        return false;
      }
    }
  }
});
