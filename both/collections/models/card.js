Card = ManyModel.extendAndSetupCollection("card");

Card.schema = new SimpleSchema({
  "question":{
    type: String,
  },
  "answer":{
    type: String,
  },
  "difficulty":{
    type: Number,
  },
  "createdBy":{
    type: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      type: "hidden",
    },
  },
});

Card.appendSchema(Card.schema);

Card.meteorMethods = {};

Card.meteorMethods.insertCard = new ValidatedMethod ({
  name: "Card.meteorMethods.insertCard",
  validate: function(){
      return Card.schema.validator()
    },
  run: function( stuff ) {
      Card.collection.insert(stuff);
    },
});

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
