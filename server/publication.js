Meteor.publish("listOfCards", function(){
  if (this.userId) {
    var stuff = Card.find();
    return stuff;
  }
});


Meteor.publish("listOfTags", function(){
  if (this.userId) {
    var stuff = Tag.find();
    return stuff;
  }
});
