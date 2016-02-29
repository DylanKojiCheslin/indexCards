Meteor.publish("listOfCards", function(){
  if (this.userId) {
    var stuff = Card.collection.find();
    return stuff;
  }
});
