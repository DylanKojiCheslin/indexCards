Tag = ManyModel.extendAndSetupCollection("tag");

Tag.schema = new SimpleSchema({
  "text":{
    type: String,
  },
});

Tag.appendSchema(Tag.schema);

Tag.meteorMethods = {};
