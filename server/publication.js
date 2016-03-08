Meteor.publish("listOfCards", function(){
  if (this.userId) {
    var stuff = Card.collection.find();
    return stuff;
  }
});


Meteor.publish("listOfTags", function(){
  if (this.userId) {
    var stuff = Tag.collection.find();
    return stuff;
  }
});
