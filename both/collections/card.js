Card = ManyModel.extendAndSetupCollection("card");

Card.collection.allow({
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

Card.appendSchema({
  "questions":{
    type: String,
  },
  "answer":{
    type: String,
  },
  "difficulty":{
    type: Number,
  },
  //tags to be refrenced by ManyModel
  // "tags":{
  //   type:
  // },
  // "createdBy":{
  //   type: SimpleSchema.RegEx.Id,
  //   autoform: {
  //     type: "hidden",
  //   }
  // },
});

//Card.methods({});
