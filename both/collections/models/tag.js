Tag = ManyModel.extendAndSetupCollection("tag");

Tag.schema = new SimpleSchema({
  "tag":{
    type: String,
  },
});

Card.appendSchema(Card.schema);
