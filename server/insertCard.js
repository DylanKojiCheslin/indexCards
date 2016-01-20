Meteor.methods({
  insertCard:function(doc){
     check(doc, Card.collection.simpleSchema());
     if (!this.userId) {
        throw new Meteor.Error("access denied", "please log in")
     }
     Card.collection.insert(doc);
  }
});
