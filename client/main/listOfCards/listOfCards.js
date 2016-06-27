Template.listOfCards.onCreated(function (){
  this.subscribe("listOfCards");
});

Template.listOfCards.helpers({
    ofTheCards : function(){
        return Card.find();
    },
});
