Template.listOfTags.onCreated(function (){
  this.subscribe("listOfTags");
});

Template.listOfTags.helpers({
    ofTheTags : function(){
        return Tag.collection.find();
    },
});
