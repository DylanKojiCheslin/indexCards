Meteor.publish("listOfCards", function(){
  if (this.userId) {
    var stuff = Card.cursor({});
    return stuff;
  }
});


Meteor.publish("listOfTags", function(){
  if (this.userId) {
    var stuff = Tag.cursor();
    return stuff;
  }
});
