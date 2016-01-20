Meteor.publish("listOfCards", function(){
  if (this.userId) {
    var stuff = Card.collection.find();
    console.log(stuff);
    return stuff
  }
});
