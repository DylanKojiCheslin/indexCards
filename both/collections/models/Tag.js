Tag = class Tag extends SmartModel {
  static schema() {
    return {
      "text":{
        type: String,
      }
    }
  }

  get hasMany() {
    return {
      cards: {}
    }
  }
}

Tag.meteorMethods = {};

//inset meteor method
Tag.meteorMethods.insertTag = new ValidatedMethod ({
  name: "Tag.meteorMethods.insertTag",
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'You need to login',
    message: 'You need to be logged in to call Tag.insertTag',
  },
  validate: function(doc){
    new SimpleSchema(
      Tag.schema()
    ).validator(doc);
    },
  run: function( doc ) {
      Tag.create(doc);
    },
});

Tag.meteorMethods.checkExists = new ValidatedMethod ({
  name: "Tag.meteorMethods.checkExists",
  mixins : [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    message: 'You need to be logged in to call Tag.checkExists',
    reason: 'You need to login'
  },
  validate: function(doc){
    new SimpleSchema(
      Tag.schema()
    ).validator(doc);
  },
    //this would be better as a static method of a class
    //how to do this as a ValidatedMethod
  run: function( tag ) {
    if ( ! this.isSimulation) {
      var tagExists = Tag.find({"text": tag.text});
      if (tagExists) {
        return tagExists._id;
      }
    }
  }
});

Tag.allow({
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
